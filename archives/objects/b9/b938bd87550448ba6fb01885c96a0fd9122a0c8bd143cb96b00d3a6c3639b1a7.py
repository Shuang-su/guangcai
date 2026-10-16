import concurrent.futures,datetime,json,subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];WORK=ROOT/'.codex-work/reconstruction'
def api(path):return json.loads(subprocess.check_output(['gh','api',('repos/Shuang-su/guangcai/'+path).rstrip('/')],text=True))
def check(x):
 c=api('git/commits/'+x['sha']);tree=subprocess.check_output(['git','rev-parse',x['sha']+'^{tree}'],cwd=WORK,text=True).strip()
 assert c['sha']==x['sha'] and c['tree']['sha']==tree
 return {'version':x['version'],'sha':x['sha'],'treeSha':tree,'authorDate':c['author']['date'],'committerDate':c['committer']['date'],'verified':True}
rows=json.loads((WORK/'docs/history/commits.json').read_text())
if '--reuse-checkpoints' in sys.argv:
 checks=json.loads((WORK/'docs/history/github-readback.json').read_text())['checkpoints']
else:
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:checks=list(ex.map(check,rows))
head=subprocess.check_output(['git','rev-parse','HEAD'],cwd=WORK,text=True).strip();remote=api('git/trees/'+head+'?recursive=1');assert not remote.get('truncated')
local={}
for line in subprocess.check_output(['git','ls-tree','-r',head],cwd=WORK,text=True).splitlines():
 meta,path=line.split('\t',1);mode,typ,sha=meta.split();local[path]=(typ,sha)
rmap={f['path']:(f['type'],f['sha']) for f in remote['tree'] if f['type']!='tree'};assert local==rmap
bad=[p for p in rmap if any(x in p.split('/') for x in ['node_modules','.codex-work','.netlify','.env'])];assert not bad
raw=api('pulls/8')
pr={'number':raw['number'],'url':raw['html_url'],'title':raw['title'],'state':raw['state'].upper(),'headRefOid':raw['head']['sha'],'headRefName':raw['head']['ref'],'baseRefName':raw['base']['ref'],'mergeable':raw['mergeable'],'labels':[{'name':x['name']} for x in raw['labels']]}
assert pr['headRefOid']==head and pr['state']=='OPEN' and pr['baseRefName']=='codex/import-2.1'
raw=api('issues/7');issue={'number':raw['number'],'url':raw['html_url'],'title':raw['title'],'state':raw['state'].upper()}
repo=api('');assert repo['private']
report={'checkedAtUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'repository':repo['html_url'],'private':repo['private'],'branch':'codex/reconstruct-history','head':head,'remoteFilesVerified':len(local),'forbiddenPaths':bad,'checkpoints':checks,'pr':pr,'issue':issue}
destination=ROOT/'.codex-work/history/final-readback.json' if '--reuse-checkpoints' in sys.argv else WORK/'docs/history/github-readback.json'
destination.write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({k:v for k,v in report.items() if k!='checkpoints'},ensure_ascii=False,indent=2))
