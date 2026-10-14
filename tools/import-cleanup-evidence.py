"""Import byte-verified legacy authoring evidence before physical consolidation.

Only consumes the explicit cleanup audit. Never runs recovered source scripts.
Conversation extracts lacking channel provenance remain local and are not imported.
"""
import hashlib, json, subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
D=ROOT/'docs/changes/20261014-source-consolidation'
def git(*args,raw=None):
    return subprocess.check_output(['git',*args],cwd=ROOT,input=raw)
def main():
    audit=json.loads((ROOT.parent/'cleanup-verification.json').read_text())
    excluded={r['path'] for r in json.loads((ROOT.parent/'cleanup-sensitive.json').read_text())}
    m=json.loads((D/'source-manifest.json').read_text())
    by_sha={r['sha256']:r for r in m['content']};added=[];staged=[];aliases=0
    roots=sorted([(Path(v),k) for k,v in m['roots'].items() if v!='/'],key=lambda t:len(str(t[0])),reverse=True)
    for a in audit['verified']+audit['unknown']:
        if a['path'] in excluded:continue
        p=Path(a['path']);raw=p.read_bytes();sha=hashlib.sha256(raw).hexdigest()
        assert sha==a['sha256'] and len(raw)==a['bytes'],p
        entry=by_sha.get(sha)
        if entry is None:
            lfs=len(raw)>=50*1024**2
            archive=f"archives/{'lfs' if lfs else 'objects'}/{sha[:2]}/{sha}{p.suffix.lower()}"
            stored=git('lfs','clean','--',archive,raw=raw) if lfs else raw
            oid=git('hash-object','-w','--stdin',raw=stored).decode().strip()
            git('update-index','--add','--cacheinfo',f'100644,{oid},{archive}')
            entry={'sha256':sha,'bytes':len(raw),'storage':'git-lfs' if lfs else 'git-blob','gitBlob':oid,'archivePath':archive,'sources':[]}
            m['content'].append(entry);by_sha[sha]=entry;added.append(entry);staged.append(archive)
        for root,key in roots:
            if p.is_relative_to(root):break
        else:raise ValueError(str(p))
        rel=p.relative_to(root).as_posix()
        if not any(s['root']==key and s['relative']==rel for s in entry['sources']):
            entry['sources'].append({'root':key,'relative':rel,'mtime_ns':a['mtime_ns']});aliases+=1
    if staged:git('update-index','--skip-worktree','--stdin',raw=('\n'.join(staged)+'\n').encode())
    m['summary'].update(currentVerifiedContent=len(m['content']),currentSourceOccurrences=sum(len(r['sources']) for r in m['content']))
    prior=m.get('cleanupFollowup',{})
    m['cleanupFollowup']={'date':'2026-10-14','newEntries':prior.get('newEntries',0)+len(added),'newAliases':prior.get('newAliases',0)+aliases,'localOnlyConversationExtracts':len(excluded),'reason':'Previously excluded work caches contained authoring/QA evidence; re-audited before removal.'}
    (D/'source-manifest.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
    with (D/'source-index.md').open('a') as f:
        f.write('\n## 清理前补录的制作与验收中间文件\n\n')
        for r in added:
            f.write(f"- [{r['sources'][0]['relative']}](../../../{r['archivePath']}) — {r['bytes']:,} bytes；`{r['sha256']}`\n")
    print(json.dumps(m['cleanupFollowup'],ensure_ascii=False))
if __name__=='__main__':main()
