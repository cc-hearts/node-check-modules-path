import { g as getNodeModulesDepsPath, a as getCurrentPath } from './chunks/deps.js';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'path';
import 'os';
import 'fs';
import 'fs/promises';
import 'url';
import 'node:path';
import 'node:child_process';

async function writeDepsPath(path, deps) {
    return writeFile(path, JSON.stringify(deps, null, 2));
}

(async () => {
    const nodeModulesDepsPath = await getNodeModulesDepsPath();
    const currentPath = await getCurrentPath();
    const path = resolve(currentPath, 'deps.json');
    await writeDepsPath(path, nodeModulesDepsPath);
    console.log('node_modules deps path write in ' + path);
})();
