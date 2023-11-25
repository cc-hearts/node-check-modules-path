import { getCurrentPath, getNodeModulesDepsPath } from './deps.js'
import { writeDepsPath } from './fs.js'
import { resolve } from 'path'
;(async () => {
  const nodeModulesDepsPath = await getNodeModulesDepsPath()
  const currentPath = await getCurrentPath()
  const path = resolve(currentPath, 'deps.json')
  await writeDepsPath(path, nodeModulesDepsPath)
  console.log('node_modules deps path write in ' + path)
})()
