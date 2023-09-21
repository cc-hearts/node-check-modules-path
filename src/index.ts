import { findNodeModules, getCurrentPath } from './deps.js'
import { writeDepsPath } from './fs.js'
import { resolve } from 'path'


(async () => {
  const nodeModulesDepsPath = await findNodeModules()
  const currentPath = await getCurrentPath()
  const path = resolve(currentPath, 'deps.json')
  writeDepsPath(path, nodeModulesDepsPath)
})()