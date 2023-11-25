import { readdir } from 'node:fs/promises'
import { validateDirName } from './config.js'
import { homedir } from 'os'
import { findUpPkg } from '@cc-heart/utils-service'
import { resolve } from 'node:path'
import { exec } from 'node:child_process'
import { isMacOs, isWindow } from './validate.js'

// find all node modules in the current users home directory
export const findNodeModules = async (
  path: string = homedir(),
  nodeModules: string[] = [],
): Promise<string[]> => {
  try {
    const dirs = await readdir(path, { withFileTypes: true })
    for (const dir of dirs) {
      if (dir.isDirectory() && validateDirName(dir.name)) {
        const paths = `${path}/${dir.name}`
        if (dir.name === 'node_modules') {
          nodeModules.push(paths)
          console.log('nodeModules paths:', paths)
        } else {
          await findNodeModules(paths, nodeModules)
        }
      }
    }
  } catch (e) {
    // console.log('findNodeModules catch error: ', e);
  }

  return nodeModules
}

export async function getCurrentPath() {
  const cwd = process.cwd()
  let currentPath = (await findUpPkg(cwd)) || cwd
  if (currentPath) {
    currentPath = resolve(currentPath, '..')
  }
  return currentPath
}

export async function getLogicalDiskOfWindows() {
  return new Promise<string[]>((resolve, reject) => {
    exec('wmic logicaldisk get caption', (error, stdout, stderr) => {
      if (error) {
        reject(`Error while executing command: ${error.message}`)
        return
      }
      if (stderr) {
        reject(`Command execution error: ${stderr}`)
        return
      }
      resolve(
        stdout
          .trim()
          .split('\r\r\n')
          .slice(1)
          .map((target) => target.trim()),
      )
    })
  })
}

export async function getNodeModulesDepsPath() {
  if (isMacOs()) {
    return await findNodeModules()
  }

  if (isWindow()) {
    const drives = await getLogicalDiskOfWindows()
    const task = drives.map(async (disk: string) => {
      return await findNodeModules(disk)
    })

    return Promise.all(task).then((deps) => {
      return deps.flat()
    })
  }

  // TODO:
  return []
}
