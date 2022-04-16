const insetVueAttr = require('../insetAttr/insetVueAttr')
const sfc = require('@vue/compiler-sfc')
function vLoader(source) {
  const vueParse = sfc.parse(source)
  const domAst = vueParse.descriptor.template.ast // template开始的dom ast结构
  const templateSource = domAst.loc.source // template部分的原字符串
  const startLine = domAst.loc.start.line
  const newTemplateSource = insetVueAttr.default(
    domAst,
    Array.from({ length: startLine }).fill('').join('\n') + templateSource, // 解决在tmeplate前面加了注释之类的信息 导致行数计算错误
    this.resourcePath,
  )
  const newContent = source.replace(templateSource, newTemplateSource)
  return newContent
}
module.exports = vLoader
