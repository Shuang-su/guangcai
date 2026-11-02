// Stream a committed current source snapshot and immutable production archive.
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
execFileSync('python3', ['-B', fileURLToPath(new URL('./package-handoff.py', import.meta.url)), ...process.argv.slice(2)], {stdio: 'inherit'});
