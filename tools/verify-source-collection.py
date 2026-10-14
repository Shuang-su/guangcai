"""Verify every collected original against immutable Git/LFS content.

Run after staging (default :path) or with a commit/ref argument. Sparse checkout
is supported: the archive need not be materialized again on a nearly full disk.
"""
import sys,subprocess,json,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
REF=sys.argv[1] if len(sys.argv)>1 else ''
def blob(p):return subprocess.check_output(['git','show',f'{REF}:{p}'],cwd=ROOT)
manifest='docs/changes/20261014-source-consolidation/source-manifest.json'
a=json.loads(blob(manifest));common=Path(subprocess.check_output(['git','rev-parse','--git-common-dir'],cwd=ROOT).decode().strip())
if not common.is_absolute():common=ROOT/common
seen=set();lfs=0
for r in a['content']:
 assert r['sha256'] not in seen;seen.add(r['sha256'])
 b=blob(r['archivePath'])
 if r['storage']=='git-lfs':
  assert f"oid sha256:{r['sha256']}\nsize {r['bytes']}\n".encode() in b
  s=r['sha256'];b=(common/'lfs/objects'/s[:2]/s[2:4]/s).read_bytes();lfs+=1
 assert len(b)==r['bytes'],r['archivePath']
 assert hashlib.sha256(b).hexdigest()==r['sha256'],r['archivePath']
followup=a.get('hydrationFollowup',{})
hydrated=followup.get('verifiedPreviouslyUnreadable',0)
print(json.dumps({'verifiedContent':len(seen),'lfsObjects':lfs,'sourceOccurrences':sum(len(r['sources']) for r in a['content']),'historicallyUnreadable':len(a['unreadable']),'hydratedAndVerified':hydrated,'unreadableRemaining':len(a['unreadable'])-hydrated,'blocked':len(a['blocked'])}))
