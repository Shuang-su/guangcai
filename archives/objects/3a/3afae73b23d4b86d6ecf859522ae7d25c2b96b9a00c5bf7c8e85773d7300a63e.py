from pathlib import Path
import json,subprocess,hashlib,urllib.parse,concurrent.futures,re,datetime
base=Path('evidence/deployment/floral-restored');r=json.loads((base/'remote-files.json').read_text());manifest={f['path']:f for f in json.loads((base/'release-manifest.json').read_text())['files']}
comment=re.compile(rb'\n<!-- This site is hosted on Netlify\. Anyone can build and deploy a site\n.*?Netlify hosting facts for this site: static/SSR served via Netlify Edge\. -->',re.S)
def fix(item):
 if item['matches']:return item
 path=item['path'];expected=manifest[path];url='https://guangcai-no1-china-v3.netlify.app/'+urllib.parse.quote(path);pieces=[]
 try:
  if path.endswith('.html'):
   result=subprocess.run(['curl','-4','--http1.1','--connect-timeout','15','--max-time','40','--retry','2','-f','-sS',url],capture_output=True,check=True);data=result.stdout
  else:
   for start in range(0,expected['size'],4*1024*1024):
    end=min(start+4*1024*1024,expected['size'])-1
    result=subprocess.run(['curl','-4','--http1.1','--connect-timeout','15','--max-time','80','--retry','2','-f','-sS','--range',f'{start}-{end}',url],capture_output=True,check=True)
    assert len(result.stdout)==end-start+1,('range length',path,start,len(result.stdout));pieces.append(result.stdout)
   data=b''.join(pieces)
  digest=hashlib.sha256(data).hexdigest();out={'path':path,'size':len(data),'sha256':digest,'matches':digest==expected['sha256'],'verificationTransport':'IPv4 HTTP/1.1; bounded byte ranges for large files'}
  if path.endswith('.html') and not out['matches']:
   normalized,count=comment.subn(b'',data);out.update(netlifyCommentCount=count,normalizedSha256=hashlib.sha256(normalized).hexdigest(),matchesAfterRemovingNetlifyComment=count==1 and hashlib.sha256(normalized).hexdigest()==expected['sha256']);(base/'served-html').mkdir(exist_ok=True);(base/'served-html'/path).write_bytes(data)
  print(path,'verified',out['matches'] or out.get('matchesAfterRemovingNetlifyComment'),flush=True);return out
 except Exception as e:print(path,'failed',str(e),flush=True);return {'path':path,'matches':False,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:r['files']=list(pool.map(fix,r['files']))
r.update(verifiedAt=datetime.datetime.now(datetime.timezone.utc).isoformat(),allSha256Match=all(f['matches'] for f in r['files']),allPublicFilesVerified=all(f['matches'] or f.get('matchesAfterRemovingNetlifyComment',False) for f in r['files']),exactMatches=sum(f['matches'] for f in r['files']),netlifyCommentOnly=sum(bool(f.get('matchesAfterRemovingNetlifyComment')) for f in r['files']))
(base/'remote-files.json').write_text(json.dumps(r,indent=2));print(json.dumps({k:v for k,v in r.items() if k!='files'}))
