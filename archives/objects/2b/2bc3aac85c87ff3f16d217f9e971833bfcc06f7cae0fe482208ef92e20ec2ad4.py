import hashlib,json,shutil,subprocess,sys
from pathlib import Path
from stage import HERE,ROOT,WORK,stages
i=int(sys.argv[1]);key,version,title,line,deployment=stages[i]
report=json.loads((HERE/(key+'-validation.json')).read_text())
assert all(c['exitCode']==0 for c in report['commands']),report['commands']
assert not report.get('releaseDifferences'),report.get('releaseDifferences')
ops=json.loads((HERE/('original-operations.json' if key.startswith('original') else 'china-operations.json')).read_text())
report['originalTimeUTC']=max(o['time'] for o in ops if o['line']<=line)
report['reconstructedAtUTC']=subprocess.check_output(['date','-u','+%Y-%m-%dT%H:%M:%SZ'],text=True).strip()
report['scopeNotes']=[
 'Source checkpoints are reconstructed now from saved file writes/patches. They were not Git commits at the original time.',
 'assets/ retains the collected masters and inputs, including unused later alternatives. Runtime references are determined by each checkpoint source.',
 'Early runtime maps are re-derived locally from retained masters/PSD with the historical scripts and current retained dependency lock. They are not claimed to be original exported bytes.',
 'Historical release comparison checks every path in the preserved release; ancillary retained assets outside that release are not deployment contents.',
 'No historical shell command or deployment was replayed. The original project and online sites were not modified.',
 'Source fit-calibration metadata uses preserved calibration outputs; ephemeral renderer candidates and unsaved editor states are not all recoverable.'
]
diag=json.loads((HERE/('original-replay-diagnostics.json' if key.startswith('original') else 'china-replay-diagnostics.json')).read_text())
report['sourceWriteEvidence']=[e for e in diag['events'] if e['line']<=line]
report['operationDigests']=[{'line':o['line'],'timeUTC':o['time'],'tool':o['tool'],'sha256':hashlib.sha256(json.dumps(o['input'],ensure_ascii=False,sort_keys=True).encode()).hexdigest()} for o in ops if o['line']<=line and any(e['line']==o['line'] for e in report['sourceWriteEvidence'])]
out=WORK/'docs/history/checkpoints';out.mkdir(parents=True,exist_ok=True)
(out/(version+'.json')).write_text(json.dumps(report,ensure_ascii=False,indent=2))
# Publish local validation logs without machine-specific absolute paths.
for command in report['commands']:
 f=WORK/command['log'];dest=WORK/'docs/history/validation'/version/f.name;dest.parent.mkdir(parents=True,exist_ok=True)
 s=f.read_text().replace(str(WORK),'<recovery-worktree>').replace(str(ROOT),'<archive-root>')
 dest.write_text(s)
requests=ROOT/'docs/changes/20261013-history-reconstruction'
shutil.copytree(requests,WORK/'docs/changes/20261013-history-reconstruction',dirs_exist_ok=True)
(WORK/'HISTORY.md').write_text('''# 根据真实会话补建的开发历史

该分支按原始修改顺序恢复源码，提交日期是实际补录日期。它不会改写导入分支，也不控制线上部署。

1.0 / 2.0 是已约定的上线基线；2.1 是之后的布局修订。之前的开发节点用 `1.0-pre.N` / `2.0-pre.N`，避免将旧开发步骤误记成新的线上版本。以后正常开发继续按 1.1、1.2 / 2.2、2.3 等编号。

每个 checkpoint 的源码可直接从 Git 检出。`assets/` 保留补录时汇总的素材全集，其中可能包含该节点尚未使用的后续备选；实际使用哪套花纸由当时源码、素材名和派生脚本决定。早期贴图依据保留母版重新派生，未声称是当时导出字节；能与历史发布逐文件匹配的节点另行标明。

来源与验证位于 `docs/history/checkpoints/` 和 `docs/history/validation/`。完整原会话不入库；记录只包含文件操作的时间、会话 ID、行号、摘要和源码哈希。构建成功不等于新的视觉验收或再次上线。

当前恢复节点：**'''+version+' · '+title+'**。\n')
(WORK/'docs/changes/20261013-history-reconstruction/completion.md').write_text('# 恢复进度\n\n当前阶段：'+version+' · '+title+'。本提交保存当前阶段完整源码、必要运行素材及来源/验证记录。\n\n构建、派生与既有几何测试的实际结果见 `docs/history/checkpoints/'+version+'.json`。完成全部节点后在后续提交汇总各 checkpoint SHA、缺口及远端回读；当前阶段不代表整个任务完成。\n')
subprocess.run(['git','add','--',report['project'],'docs/history','docs/changes/20261013-history-reconstruction','HISTORY.md','.gitignore','evidence'] if (WORK/'evidence').exists() else ['git','add','--',report['project'],'docs/history','docs/changes/20261013-history-reconstruction','HISTORY.md','.gitignore'],cwd=WORK,check=True)
bad=subprocess.check_output(['git','diff','--cached','--name-only'],cwd=WORK,text=True)
assert not any('/node_modules' in p or '/.codex-work/' in p or '/.netlify/' in p or p.endswith('/.env') for p in bad.splitlines())
body='Reconstructed from session '+report['sessionId']+' through line '+str(line)+'.\nOriginal milestone: '+report['originalTimeUTC']+'.\nRecorded now; no backdating, rebasing, or deployment.\nEvidence: docs/history/checkpoints/'+version+'.json'
subprocess.run(['git','commit','-m','history('+version+'): '+title,'-m',body],cwd=WORK,check=True,stdout=subprocess.DEVNULL)
sha=subprocess.check_output(['git','rev-parse','HEAD'],cwd=WORK,text=True).strip()
records=HERE/'commits.json';allrecords=json.loads(records.read_text()) if records.exists() else []
allrecords.append({'version':version,'title':title,'sha':sha,'key':key,'originalTimeUTC':report['originalTimeUTC']});records.write_text(json.dumps(allrecords,ensure_ascii=False,indent=2))
print(version,sha,flush=True)
