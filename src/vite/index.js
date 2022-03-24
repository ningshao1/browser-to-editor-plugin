import { parse } from '@vue/compiler-sfc'
import InsetAttr from '../insetAttr/insetVueAttr'
const fs = require('fs')
const path = require('path')
const code = fs.readFileSync(path.resolve(__dirname, '../ui/index.html'), 'utf-8')
import openLaunchEditor from '../serve'
var defaultPort = 5000 //默认端口
export default function (option = {}) {
  if (typeof option !== 'object') {
    throw 'Please pass in the correct configuration items'
  }
  return {
    name: 'vite-plugin-vue-jumpCode',
    apply: 'serve',
    buildStart(...options) {
      openLaunchEditor(port => {
        defaultPort = port
      }, option.code)
    },
    transform(source, filePath) {
      if (/\.vue$/.test(filePath)) {
        const vueParserContent = parse(source) // vue文件parse后的内容
        const domAst = vueParserContent.descriptor.template.ast // template开始的dom ast结构
        const templateSource = domAst.loc.source // template部分的原字符串
        const newTemplateSource = InsetAttr(domAst, templateSource, filePath)
        const newContent = source.replace(templateSource, newTemplateSource)
        return newContent
      }
    },
    transformIndexHtml(html) {
      return html.replace('</html>', `${code.replace(/__port__/, defaultPort)}\n</html>`)
    },
  }
}
