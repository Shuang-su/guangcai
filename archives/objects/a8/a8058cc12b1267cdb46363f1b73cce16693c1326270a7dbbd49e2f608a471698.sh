mkdir -p .codex-work/cache
curl --fail --max-time 30 -L https://registry.npmjs.org/@types/three/-/three-0.183.1.tgz -o .codex-work/cache/types-three-0.183.1.tgz
node --input-type=module -e 'import fs from "node:fs";import crypto from "node:crypto";const lock=JSON.parse(fs.readFileSync("package-lock.json"));const data=fs.readFileSync(".codex-work/cache/types-three-0.183.1.tgz");if("sha512-"+crypto.createHash("sha512").update(data).digest("base64")!==lock.packages["node_modules/@types/three"].integrity)throw Error("integrity mismatch");console.log("verified exact lockfile integrity");'
tar -xzf .codex-work/cache/types-three-0.183.1.tgz -C node_modules/@types
kill -TERM 18342
npm run build