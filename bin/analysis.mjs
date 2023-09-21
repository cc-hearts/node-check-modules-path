import 'fs';
import 'fs/promises';
import { f as findUpPkg } from './chunks/path.js';
import { resolve } from 'path';
import { readdir, writeFile } from 'node:fs/promises';
import { platform, homedir } from 'os';
import { join } from 'node:path';
import 'url';

function isMacOs() {
    return platform() === 'darwin';
}

const config = {
    // mac os
    exclude: ['Library', 'Applications']
};
// 是否前缀有点
function isPrefixDot(path) {
    return path.startsWith('.');
}
function validateDirName(dir) {
    if (isMacOs()) {
        return !isPrefixDot(dir) && !config.exclude.includes(dir);
    }
}

// find all node modules in the current users home directory
const findNodeModules = async (path = homedir(), nodeModules = []) => {
    try {
        const dirs = await readdir(path, { withFileTypes: true });
        for (const dir of dirs) {
            if (dir.isDirectory() && validateDirName(dir.name)) {
                const paths = `${path}/${dir.name}`;
                if (dir.name === 'node_modules') {
                    nodeModules.push(paths);
                    console.log('nodeModules paths:', paths);
                }
                else {
                    await findNodeModules(paths, nodeModules);
                }
            }
        }
    }
    catch (e) {
        // console.log('Error: ', e);
    }
    return nodeModules;
};

const _join = (...args) => join(process.cwd(), ...args);
function writeDepsPath(path, deps) {
    writeFile(_join(path), JSON.stringify(deps, null, 2));
}

(async () => {
    const nodeModulesDepsPath = await findNodeModules();
    const cwd = process.cwd();
    const currentPath = await findUpPkg(cwd);
    const path = resolve(currentPath || cwd, 'deps.json');
    writeDepsPath(path, nodeModulesDepsPath);
})();
