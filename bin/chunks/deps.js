import { readdir } from 'node:fs/promises';
import { platform, homedir } from 'os';
import { existsSync } from 'fs';
import { stat } from 'fs/promises';
import 'url';
import { resolve } from 'path';
import { resolve as resolve$1 } from 'node:path';

function isMacOs() {
    return platform() === 'darwin';
}

const config = {
    // mac os
    exclude: ['Library', 'Applications', 'app.asar.unpacked']
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

async function isDirectory(path) {
    const file = await stat(path);
    return file.isDirectory();
}

/**
 * Step up to find the most recent file
 *
 * @param path
 * @returns
 */
async function findUpFile(path, fileName) {
    if (fileName === void 0) {
        throw new Error('fileName is required');
    }
    let curPath;
    if (await isDirectory(path)) {
        curPath = resolve(path, 'package.json');
    }
    else {
        curPath = resolve(path, '../package.json');
    }
    if (existsSync(curPath)) {
        return curPath;
    }
    if (path === '/')
        return null;
    return findUpFile(resolve(path, '..'), fileName);
}
async function findUpPkg(path) {
    return findUpFile(path, 'package.json');
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
async function getCurrentPath() {
    const cwd = process.cwd();
    let currentPath = await findUpPkg(cwd);
    if (currentPath) {
        currentPath = resolve$1(currentPath, '..');
    }
    else {
        currentPath = cwd;
    }
    return currentPath;
}

export { findNodeModules as f, getCurrentPath as g };
