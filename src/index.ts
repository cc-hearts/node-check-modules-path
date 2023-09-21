import { findUpPkg } from '@cc-heart/utils-service'
import { findNodeModules } from './deps.js'
import { writeDepsPath } from './fs.js'
import { resolve } from 'path'


(async () => {
  const nodeModulesDepsPath = await findNodeModules()
  const cwd = process.cwd()
  const currentPath = await findUpPkg(cwd)
  const path = resolve(currentPath || cwd, 'deps.json')
  writeDepsPath(path, nodeModulesDepsPath)
})()