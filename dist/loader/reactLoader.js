"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _const = require("../const");

var J = require('jscodeshift');

function _default(source) {
  var _this = this;

  try {
    var root = J(source);
    var JSX = root.find(J.JSXOpeningElement);
    JSX.forEach(function (item) {
      if (!item.value.name.name) return;
      var name = J.jsxAttribute(J.jsxIdentifier(_const.InjectNodeName), J.stringLiteral(item.value.name.name));
      var col = J.jsxAttribute(J.jsxIdentifier(_const.InjectColumnName), J.stringLiteral(String(item.value.loc.start.column)));
      var path = J.jsxAttribute(J.jsxIdentifier(_const.InjectPathName), J.stringLiteral(_this.resourcePath));
      var line = J.jsxAttribute(J.jsxIdentifier(_const.InjectLineName), J.stringLiteral(String(item.value.loc.start.line)));
      item.value.attributes.push(col, name, path, line);
    });
    return root.toSource();
  } catch (e) {
    return source;
  }
}