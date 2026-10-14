#!/usr/bin/env python3
"""Prepare and sign the ten-year candidate; never install it."""
from pathlib import Path
import subprocess
import prepare_candidate as preparation

preparation.WORK = preparation.ROOT / '.codex-work/tmp/aldente-helper-10y-20260904'
preparation.APP = preparation.WORK / 'candidate/AlDente Pro.app'
preparation.CERT_SHA1 = 'E7FD455E4F44D319B42E6B2C81995034873725AD'
preparation.CLIENT_REQ = (f'identifier "{preparation.CLIENT_ID}" and certificate leaf = '
                          f'H"{preparation.CERT_SHA1}"')
preparation.HELPER_REQ = (f'identifier "{preparation.HELPER_ID}" and certificate leaf = '
                          f'H"{preparation.CERT_SHA1}"')

if __name__ == '__main__':
    identities = subprocess.check_output(['/usr/bin/security', 'find-identity', '-v', '-p', 'codesigning'], text=True)
    if preparation.CERT_SHA1 not in identities:
        raise SystemExit('The ten-year code-signing identity is not ready.')
    preparation.prepare()
    helper = preparation.APP / 'Contents/Library/LaunchServices' / preparation.HELPER_ID
    for target in [helper, preparation.APP]:
        subprocess.run(['/usr/bin/xattr', '-rd', 'com.apple.FinderInfo', str(preparation.APP)], check=True)
        subprocess.run(['/usr/bin/codesign', '--force', '--sign', preparation.CERT_SHA1,
                        '--timestamp=none', '--preserve-metadata=identifier,entitlements,flags,runtime',
                        str(target)], check=True)
    subprocess.run(['/usr/bin/xattr', '-rd', 'com.apple.FinderInfo', str(preparation.APP)], check=True)
    print('Signed ten-year candidate:', preparation.APP)
