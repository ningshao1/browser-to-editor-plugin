"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _const = require("../const");

function InsetAttr(ast, source, filePath) {
  if ((ast === null || ast === void 0 ? void 0 : ast.type) === 1) {
    if (ast.children && ast.children.length) {
      for (var i = ast.children.length - 1; i >= 0; i--) {
        var node = ast.children[i];
        source = InsetAttr(node, source, filePath);
      }
    }

    var codeLines = source.split('\n');
    var line = ast.loc.start.line;
    var column = ast.loc.start.column;
    var columnToInject = column + ast.tag.length;
    var targetLine = codeLines[line - 1];
    var nodeName = ast.tag;
    var newLine = targetLine.slice(0, columnToInject) + " ".concat(_const.InjectLineName, "=\"").concat(line, "\" ").concat(_const.InjectColumnName, "=\"").concat(column, "\" ").concat(_const.InjectPathName, "=\"").concat(filePath, "\" ").concat(_const.InjectNodeName, "=\"").concat(nodeName, "\"") + targetLine.slice(columnToInject);
    codeLines[line - 1] = newLine;
    source = codeLines.join('\n');
  }

  return source;
}

var _default = InsetAttr;
exports["default"] = _default;