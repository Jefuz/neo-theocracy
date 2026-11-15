#!/bin/sh
# Builds index.html (one self-contained file) from src/. Needs only sh and python3.
cd "$(dirname "$0")"
cat src/data.js src/ev1.js src/ev2.js src/data2.js src/eng1.js src/eng2.js src/band.js src/know.js src/debug.js > core.tmp.js
python3 - <<'PY'
core=open('core.tmp.js').read(); ui=open('src/ui.js').read(); a,b=open('src/shell.html').read().split('/*__JS__*/')
open('index.html','w').write(a+core+'\n'+ui+b)
PY
rm core.tmp.js
