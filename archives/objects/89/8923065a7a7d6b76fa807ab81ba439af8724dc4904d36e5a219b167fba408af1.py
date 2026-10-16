#!/usr/bin/env python3
"""Prepare only the staged AlDente copy for a dedicated local signing identity.

This script neither creates signing credentials nor installs/runs a helper.
"""
import hashlib
import json
import os
from pathlib import Path
import plistlib
import struct
import subprocess

ROOT = Path(__file__).resolve().parents[3]
WORK = ROOT / '.codex-work/tmp/aldente-helper-20260904'
APP = WORK / 'candidate/AlDente Pro.app'
BACKUP = WORK / 'backup/AlDente Pro.app'
CLIENT_ID = 'com.apphousekitchen.aldente-pro-setapp'
HELPER_ID = CLIENT_ID + '.helper'
CERT_SHA1 = 'B772FA114668B3BD1E54F8F8F3101A214E748989'
CLIENT_REQ = f'identifier "{CLIENT_ID}" and certificate leaf = H"{CERT_SHA1}"'
HELPER_REQ = f'identifier "{HELPER_ID}" and certificate leaf = H"{CERT_SHA1}"'


def sections(data):
    """Locate 64-bit Mach-O sections in every slice of a universal binary."""
    magic, count = struct.unpack_from('>II', data, 0)
    if magic != 0xCAFEBABE or not 1 <= count <= 8:
        raise ValueError('Expected a bounded FAT Mach-O binary')
    for index in range(count):
        cpu, subtype, base, size, align = struct.unpack_from('>IIIII', data, 8 + 20 * index)
        if base + size > len(data) or struct.unpack_from('<I', data, base)[0] != 0xFEEDFACF:
            raise ValueError('Invalid 64-bit Mach-O slice')
        ncmds = struct.unpack_from('<I', data, base + 16)[0]
        cursor = base + 32
        for _ in range(ncmds):
            command, length = struct.unpack_from('<II', data, cursor)
            if length < 8 or cursor + length > base + size:
                raise ValueError('Invalid Mach-O load command')
            if command == 0x19:
                nsects = struct.unpack_from('<I', data, cursor + 64)[0]
                for n in range(nsects):
                    p = cursor + 72 + 80 * n
                    section = data[p:p + 16].split(b'\0', 1)[0].decode()
                    segment = data[p + 16:p + 32].split(b'\0', 1)[0].decode()
                    section_size = struct.unpack_from('<Q', data, p + 40)[0]
                    offset = struct.unpack_from('<I', data, p + 48)[0]
                    yield cpu, segment, section, base + offset, section_size
            cursor += length


def text_hashes(path):
    data = path.read_bytes()
    return {str(cpu): hashlib.sha256(data[offset:offset + size]).hexdigest()
            for cpu, segment, section, offset, size in sections(data)
            if segment == '__TEXT' and section == '__text'}


def prepare():
    # Refuse to operate on an installed path or an already modified candidate.
    if APP.resolve().parent != (WORK / 'candidate').resolve():
        raise ValueError('Candidate path escaped its staging directory')
    original_hashes = json.loads((WORK / 'original-sha256.json').read_text())
    for relative, expected in original_hashes.items():
        if hashlib.sha256((APP / relative).read_bytes()).hexdigest() != expected:
            raise ValueError('Candidate is no longer the original copy: ' + relative)
    helper = APP / 'Contents/Library/LaunchServices' / HELPER_ID
    data = bytearray(helper.read_bytes())
    modified_slices = []
    for cpu, segment, section, offset, size in list(sections(data)):
        if segment != '__TEXT' or section != '__info_plist':
            continue
        raw = bytes(data[offset:offset + size]).rstrip(b'\0')
        info = plistlib.loads(raw)
        old = info['SMAuthorizedClients']
        if len(old) != 1 or '3WVC84GB99' not in old[0]:
            raise ValueError('Unexpected original helper authorization requirement')
        if raw.count(old[0].encode()) != 1:
            raise ValueError('Authorization requirement not uniquely located')
        patched = raw.replace(old[0].encode(), CLIENT_REQ.encode(), 1)
        if len(patched) > size:
            raise ValueError('New embedded plist does not fit its original section')
        updated = plistlib.loads(patched)
        expected = dict(info, SMAuthorizedClients=[CLIENT_REQ])
        if updated != expected:
            raise ValueError('Unexpected semantic change to helper plist')
        data[offset:offset + size] = patched.ljust(size, b'\0')
        modified_slices.append(cpu)
    if len(modified_slices) != 2:
        raise ValueError('Expected exactly two helper slices')
    helper.write_bytes(data)
    app_plist = APP / 'Contents/Info.plist'
    app_info = plistlib.loads(app_plist.read_bytes())
    if set(app_info['SMPrivilegedExecutables']) != {HELPER_ID}:
        raise ValueError('Unexpected privileged helper inventory')
    app_info['SMPrivilegedExecutables'][HELPER_ID] = HELPER_REQ
    app_plist.write_bytes(plistlib.dumps(app_info, sort_keys=False))
    # Remove only metadata that codesign explicitly rejected, only in the copy.
    cleared = 0
    for current, dirs, files in os.walk(APP, followlinks=False):
        for name in [''] + dirs + files:
            path = Path(current) / name
            if path.is_symlink():
                continue
            attributes = subprocess.check_output(['/usr/bin/xattr', str(path)], text=True).splitlines()
            for attr in ('com.apple.FinderInfo', 'com.apple.ResourceFork'):
                if attr in attributes:
                    subprocess.run(['/usr/bin/xattr', '-d', attr, str(path)], check=True)
                    cleared += 1
    report = {
        'candidate': str(APP), 'certificate_sha1': CERT_SHA1,
        'client_requirement': CLIENT_REQ, 'helper_requirement': HELPER_REQ,
        'modified_helper_architectures': modified_slices,
        'removed_rejected_metadata_attributes': cleared,
        'original_text_hashes': {
            'main': text_hashes(BACKUP / 'Contents/MacOS/AlDente'),
            'helper': text_hashes(BACKUP / 'Contents/Library/LaunchServices' / HELPER_ID),
        },
    }
    for label, path in [('main', APP / 'Contents/MacOS/AlDente'), ('helper', helper)]:
        if text_hashes(path) != report['original_text_hashes'][label]:
            raise ValueError('Executable code changed: ' + label)
    (WORK / 'candidate-preparation.json').write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report, indent=2))


if __name__ == '__main__':
    prepare()
