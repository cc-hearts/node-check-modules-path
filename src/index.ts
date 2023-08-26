import { findNodeModules } from './deps.js'
import { writeDepsPath } from './fs.js'


(async () => {
  const nodeModulesDepsPath = await findNodeModules()
  writeDepsPath('./deps.json', nodeModulesDepsPath)
})()