#!/usr/bin/env python3
"""Validate the staged pair without executing or installing either component."""
import hashlib
import json
import argparse
from pathlib import Path
import plistlib
import subprocess
from prepare_candidate import (APP, BACKUP, WORK, CLIENT_ID, HELPER_ID,
                               CLIENT_REQ, HELPER_REQ, sections, text_hashes)

checks = []
parser = argparse.ArgumentParser()
parser.add_argument('--readonly-image', action='store_true')
parser.add_argument('--ten-year', action='store_true')
parser.add_argument('--installed', action='store_true')
arguments = parser.parse_args()
if arguments.ten_year:
    WORK = WORK.parent / 'aldente-helper-10y-20260904'
    APP = WORK / 'candidate/AlDente Pro.app'
    fingerprint = 'E7FD455E4F44D319B42E6B2C81995034873725AD'
    CLIENT_REQ = f'identifier "{CLIENT_ID}" and certificate leaf = H"{fingerprint}"'
    HELPER_REQ = f'identifier "{HELPER_ID}" and certificate leaf = H"{fingerprint}"'
if arguments.readonly_image:
    APP = WORK / 'verified-image/AlDente Pro.app'
if arguments.installed:
    APP = Path('/Applications/Setapp/AlDente Pro.app')


def command_check(name, command, expected_success=True):
    result = subprocess.run(command, capture_output=True, text=True)
    passed = (result.returncode == 0) == expected_success
    checks.append({'name': name, 'passed': passed, 'exit_code': result.returncode,
                   'expected_success': expected_success,
                   'details': (result.stdout + result.stderr).strip()})


def value_check(name, passed, details):
    checks.append({'name': name, 'passed': bool(passed), 'details': details})


helper = APP / 'Contents/Library/LaunchServices' / HELPER_ID
# Signing/Launch Services may add the Finder bundle bit. It is not signed data,
# but strict codesign rejects it. Clear only this known metadata in the copy.
if not arguments.readonly_image and not arguments.installed:
    subprocess.run(['/usr/bin/xattr', '-rd', 'com.apple.FinderInfo', str(APP)], check=True)
bundle_options = [] if arguments.installed else ['--strict']
command_check('Full bundle: all architectures, deep' + (', strict' if bundle_options else ''),
              ['/usr/bin/codesign', '--verify', '--deep'] + bundle_options +
              ['--all-architectures', '--verbose=2', str(APP)])
command_check('Helper: all architectures, strict',
              ['/usr/bin/codesign', '--verify', '--strict',
               '--all-architectures', '--verbose=2', str(helper)])
for label, path, requirement in [
    ('Candidate client matches pinned certificate and ID', APP, CLIENT_REQ),
    ('Candidate helper matches pinned certificate and ID', helper, HELPER_REQ),
]:
    command_check(label, ['/usr/bin/codesign', '--verify', '--all-architectures',
                          '--verbose=2', '-R=' + requirement, str(path)])
for label, path, requirement in [
    ('Original ad hoc client rejected by new client rule', BACKUP, CLIENT_REQ),
    ('Original vendor helper rejected by new helper rule',
     BACKUP / 'Contents/Library/LaunchServices' / HELPER_ID, HELPER_REQ),
    ('Client rejected by helper-ID rule despite matching certificate', APP, HELPER_REQ),
]:
    # Isolate identity checks from unrelated original Finder metadata.
    command_check(label, ['/usr/bin/codesign', '--verify', '--all-architectures',
                          '--ignore-resources', '--verbose=2', '-R=' + requirement,
                          str(path)], expected_success=False)
for label, relative in [('main', 'Contents/MacOS/AlDente'),
                        ('helper', 'Contents/Library/LaunchServices/' + HELPER_ID)]:
    before = text_hashes(BACKUP / relative)
    after = text_hashes(APP / relative)
    value_check(label + ': executable instruction sections unchanged', before == after,
                {'original': before, 'candidate': after})
info = plistlib.loads((APP / 'Contents/Info.plist').read_bytes())
value_check('Application permits only pinned helper rule',
            info['SMPrivilegedExecutables'] == {HELPER_ID: HELPER_REQ},
            info['SMPrivilegedExecutables'])
raw = helper.read_bytes()
embedded = []
for cpu, segment, section, offset, size in sections(raw):
    if segment == '__TEXT' and section == '__info_plist':
        embedded.append(plistlib.loads(raw[offset:offset + size].rstrip(b'\0'))['SMAuthorizedClients'])
value_check('Both helper architectures permit only pinned client rule',
            embedded == [[CLIENT_REQ], [CLIENT_REQ]], embedded)
original = json.loads((WORK / 'original-sha256.json').read_text())
installed = Path('/Applications/Setapp/AlDente Pro.app')
if arguments.installed:
    expected_app = WORK / 'candidate/AlDente Pro.app'
    unchanged = {relative: (installed / relative).read_bytes() == (expected_app / relative).read_bytes()
                 for relative in original}
    value_check('Installed files match signed candidate', all(unchanged.values()), unchanged)
else:
    unchanged = {relative: hashlib.sha256((installed / relative).read_bytes()).hexdigest() == digest
                 for relative, digest in original.items()}
    value_check('Installed original files unchanged', all(unchanged.values()), unchanged)
public_cert = WORK / 'local-signing-public.pem'
command_check('Local certificate trusted for code signing',
              ['/usr/bin/security', 'verify-cert', '-p', 'codeSign', '-c', str(public_cert)])
command_check('Local certificate not accepted for SSL',
              ['/usr/bin/security', 'verify-cert', '-p', 'ssl', '-c', str(public_cert)],
              expected_success=False)
command_check('Modified helper system service ' + ('exists' if arguments.installed else 'is absent'),
              ['/bin/launchctl', 'print', 'system/' + HELPER_ID], expected_success=arguments.installed)
if arguments.installed:
    installed_helper = Path('/Library/PrivilegedHelperTools') / HELPER_ID
    value_check('System helper bytes match the installed application helper',
                installed_helper.read_bytes() == helper.read_bytes(), str(installed_helper))
    value_check('System helper is owned by root', installed_helper.stat().st_uid == 0,
                {'uid': installed_helper.stat().st_uid, 'mode': oct(installed_helper.stat().st_mode & 0o777)})
    service = subprocess.check_output(['/bin/launchctl', 'print', 'system/' + HELPER_ID], text=True)
    value_check('System helper is running', '\n\tstate = running\n' in service, service)
    command_check('System helper passes its pinned signing identity requirement',
                  ['/usr/bin/codesign', '--verify', '--strict', '--all-architectures',
                   '--verbose=2', '-R=' + HELPER_REQ, str(installed_helper)])
report = {'passed': all(check['passed'] for check in checks), 'checks': checks,
          'candidate': str(APP), 'readonly_image': arguments.readonly_image,
          'scope': 'Signature/resource/identity checks and system service presence; runtime behavior is checked separately.'}
report_name = 'validation-installed.json' if arguments.installed else ('validation-10y.json' if arguments.ten_year else 'validation.json')
destination = Path(__file__).with_name(report_name)
destination.write_text(json.dumps(report, indent=2, ensure_ascii=False) + '\n')
for check in checks:
    print(('PASS ' if check['passed'] else 'FAIL ') + check['name'])
print('Report:', destination)
raise SystemExit(0 if report['passed'] else 1)
