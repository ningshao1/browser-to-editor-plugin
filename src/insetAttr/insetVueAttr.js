import { InjectNodeName, InjectLineName, InjectPathName, InjectColumnName } from '../const'
function InsetAttr(ast, source, filePath) {
  if (ast?.type === 1) {
    if (ast.children && ast.children.length) {
      for (let i = ast.children.length - 1; i >= 0; i--) {
        const node = ast.children[i]
        source = InsetAttr(node, source, filePath)
      }
    }
    const codeLines = source.split('\n')
    const line = ast.loc.start.line
    const column = ast.loc.start.column
    const columnToInject = column + ast.tag.length
    const targetLine = codeLines[line - 1]
    const nodeName = ast.tag
    const newLine =
      targetLine.slice(0, columnToInject) +
      ` ${InjectLineName}="${line}" ${InjectColumnName}="${column}" ${InjectPathName}="${filePath}" ${InjectNodeName}="${nodeName}"` +
      targetLine.slice(columnToInject)
    codeLines[line - 1] = newLine
    source = codeLines.join('\n')
  }

  return source
}
export default InsetAttr
