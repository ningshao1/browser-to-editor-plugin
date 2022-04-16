const path = require('path')
const fs = require('fs')
const openLaunchEditor = require('../serve')
const code = fs.readFileSync(path.resolve(__dirname, '../ui/index.html'), 'utf-8')
let defaultPort = 5000
class browserToEditorPlugin {
  constructor(props) {
    this.code = props.code
  }
  apply(compiler) {
    console.log(this)
    compiler.options.module.rules.push({
      test: /\.vue$/,
      use: {
        loader: path.resolve(__dirname, './vLoader.js'),
      },
    })
    openLaunchEditor.default(port => {
      defaultPort = port
    }, this.code)
    compiler.hooks.compilation.tap('browserToEditorPlugin', compilation => {
      compilation.plugin('html-webpack-plugin-before-html-processing', (data, cb) => {
        const html = data.html.replace('</html>', `${code.replace(/__port__/, defaultPort)}\n</html>`)
        data.html = html
      })
    })
  }
}
export default browserToEditorPlugin
