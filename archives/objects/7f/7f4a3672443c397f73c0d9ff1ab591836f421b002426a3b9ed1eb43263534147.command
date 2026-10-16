#!/bin/zsh
cd "${0:A:h}"
if ! command -v node >/dev/null 2>&1; then
  print '请安装 Node.js 20.19 或更新版本后，再双击运行。'
  read '?按回车关闭'
  exit 1
fi
(sleep 2; open http://127.0.0.1:4173) &
node tools/serve-dist.mjs
