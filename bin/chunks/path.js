import 'url';
import { resolve } from 'path';
import { stat } from 'fs/promises';
import { existsSync } from 'fs';

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

export { findUpPkg as f };
