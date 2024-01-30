import { readFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { a as getCurrentPath } from './chunks/deps.js';
import 'os';
import 'fs';
import 'fs/promises';
import 'url';
import 'path';
import 'node:child_process';

async function rmRf(path) {
    return await rm(path, { recursive: true, force: true });
}
try {
    const currentPath = await getCurrentPath();
    let dirs = await readFile(resolve(currentPath, 'deps.json'), 'utf8');
    dirs = JSON.parse(dirs);
    if (Array.isArray(dirs)) {
        for (const dir of dirs) {
            await rmRf(dir);
            console.log(`removed ${dir} successfully`);
        }
    }
}
catch (e) {
    console.log('error removing deps:', e);
}

export { rmRf };
