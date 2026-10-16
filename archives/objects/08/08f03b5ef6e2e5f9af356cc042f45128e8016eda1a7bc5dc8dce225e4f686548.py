from pathlib import Path
import zipfile,hashlib,json,shutil,os,subprocess
root=Path('/Volumes/Prism/GuangcaiCeramic')
p=root/'guangcai-viewer';out=p/'.codex-work/downloads';out.mkdir(parents=True,exist_ok=True)
archive=out/'guangcai-ceramic-showcase-20260921.zip';items=[]
for f in p.rglob('*'):
 if not f.is_file():continue
 rel=f.relative_to(p)
 if any(x in {'node_modules','.codex-work','.git','.DS_Store'} for x in rel.parts):continue
 items.append((f,'guangcai-viewer/'+str(rel)))
for f in (root/'docs/changes/20260921-guangcai-showcase').glob('*'):
 if f.is_file():items.append((f,'guangcai-viewer/docs/change-records/'+f.name))
manifest=''.join(hashlib.sha256(f.read_bytes()).hexdigest()+'  '+name+'\n' for f,name in sorted(items,key=lambda x:x[1]))
with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for f,name in items:z.write(f,name)
 z.writestr('MANIFEST.sha256',manifest)
with zipfile.ZipFile(archive) as z:
 assert z.testzip() is None
 stage=p/'.codex-work/tmp/verified-delivery';stage.mkdir(parents=True,exist_ok=True);z.extractall(stage)
 for line in manifest.splitlines():
  checksum,name=line.split('  ',1);assert hashlib.sha256((stage/name).read_bytes()).hexdigest()==checksum,name
sum=hashlib.sha256(archive.read_bytes()).hexdigest();(out/'SHA256SUMS.txt').write_text(f'{sum}  {archive.name}\n')
report={'source_checkpoint':subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip(),'archive':archive.name,'sha256':sum,'bytes':archive.stat().st_size,'files':len(items)+1,'crc':'passed','extracted_sha256':'all entries match','extracted_root':str(stage/'guangcai-viewer')}
(out/'delivery-verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
