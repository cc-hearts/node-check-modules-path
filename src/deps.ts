import { readdir } from 'node:fs/promises'
import { validateDirName } from './config.js'
import { homedir } from 'os'

// find all node modules in the current users home directory
export const findNodeModules = async (path: string = homedir(), nodeModules: string[] = []): Promise<string[]> => {
  try {
    const dirs = await readdir(path, { withFileTypes: true })
    for (const dir of dirs) {
      if (dir.isDirectory() && validateDirName(dir.name)) {
        const paths = `${path}/${dir.name}`
        if (dir.name === 'node_modules') {
          nodeModules.push(paths)
          console.log('nodeModules paths:', paths);
        } else {
          await findNodeModules(paths, nodeModules)
        }
      }
    }
  } catch (e) {
    // console.log('Error: ', e);
  }

  return nodeModules
}