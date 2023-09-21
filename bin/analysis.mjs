import { f as findNodeModules, g as getCurrentPath } from './chunks/deps.js';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'path';
import 'os';
import 'fs';
import 'fs/promises';
import 'url';
import 'node:path';

function writeDepsPath(path, deps) {
    writeFile(path, JSON.stringify(deps, null, 2));
}

(async () => {
    const nodeModulesDepsPath = await findNodeModules();
    const currentPath = await getCurrentPath();
    const path = resolve(currentPath, 'deps.json');
    writeDepsPath(path, nodeModulesDepsPath);
})();
