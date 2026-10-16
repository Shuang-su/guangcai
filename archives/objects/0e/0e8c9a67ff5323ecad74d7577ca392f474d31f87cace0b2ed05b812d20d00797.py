from pathlib import Path
import json, hashlib, urllib.request, concurrent.futures, time
base=Path('evidence/deployment/floral-hq')
manifest=json.loads((base/'release-manifest.json').read_text())
url='https://guangcai-no1-china-v3.netlify.app/'
def verify(f):
    last=None
    for attempt in range(3):
        try:
            req=urllib.request.Request(url+urllib.parse.quote(f['path']),headers={'Accept-Encoding':'identity'})
            with urllib.request.urlopen(req,timeout=120) as r:
                data=r.read();headers=dict(r.headers)
            sha=hashlib.sha256(data).hexdigest()
            return {'path':f['path'],'size':len(data),'sha256':sha,'matches':sha==f['sha256'],'contentType':headers.get('Content-Type'),'contentEncoding':headers.get('Content-Encoding')}
        except Exception as e:last=str(e)
    return {'path':f['path'],'matches':False,'error':last}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: results=list(pool.map(verify,manifest['files']))
report={'url':url,'files':results,'verified':len(results),'allSha256Match':all(f['matches'] for f in results)}
(base/'remote-files.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'verified':len(results),'allSha256Match':report['allSha256Match'],'failures':[f for f in results if not f['matches']]}))
assert report['allSha256Match']
