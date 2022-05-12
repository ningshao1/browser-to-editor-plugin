import { InjectNodeName, InjectLineName, InjectPathName, InjectColumnName } from '../const'
const J = require('jscodeshift')
const babelParser = require('./parser')
export default function (source) {
  try {
    console.log('fileName:',this.resourcePath)
    console.time('compiler')
    const root = J(source, {
      parser: babelParser(),
    })
    const JSX = root.find(J.JSXOpeningElement)
    JSX.forEach(item => {
      if (!item.value.name.name) return
      const name = J.jsxAttribute(J.jsxIdentifier(InjectNodeName), J.stringLiteral(item.value.name.name))
      const col = J.jsxAttribute(J.jsxIdentifier(InjectColumnName), J.stringLiteral(String(item.value.loc.start.column)))
      const path = J.jsxAttribute(J.jsxIdentifier(InjectPathName), J.stringLiteral(this.resourcePath))
      const line = J.jsxAttribute(J.jsxIdentifier(InjectLineName), J.stringLiteral(String(item.value.loc.start.line)))
      item.value.attributes.push(col, name, path, line)
    })
    console.timeEnd('compiler')
    return root.toSource()
  } catch (e) {
    console.log('err:',e)
    return source
  }
}
