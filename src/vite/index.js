import openLaunchEditor from '../serve'
const fs = require('fs')
const path = require('path')
const { vueLoader, reactLoader } = require('../loader')
const code = fs.readFileSync(path.resolve(__dirname, '../ui/index.html'), 'utf-8')
let defaultPort = 5000 //默认端口
export default function (option = {}) {
  if (typeof option !== 'object') {
    throw 'Please pass in the correct configuration items'
  }
  return {
    name: 'browser-to-editor-plugin',
    apply: 'serve',
    buildStart() {
      openLaunchEditor(port => {
        defaultPort = port
      }, option?.code)
    },
    transform(source, filePath) {
      if (/\.vue$/.test(filePath) && !/\/node_modules\//.test(filePath)) {
        return vueLoader.call(
          {
            ...this,
            resourcePath: filePath,
          },
          source,
        )
      }
      if (/\.(jsx?)|(tsx)$/.test(filePath) && !/\/node_modules\//.test(filePath)) {
        return reactLoader.call(
          {
            ...this,
            resourcePath: filePath,
          },
          source,
        )
      }
    },
    transformIndexHtml(html) {
      return html.replace('</html>', `${code.replace(/__port__/, defaultPort)}\n</html>`)
    },
  }
}
