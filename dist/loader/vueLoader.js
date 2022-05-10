"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var insetVueAttr = require('../insetAttr/insetVueAttr');

var sfc = require('@vue/compiler-sfc');

function _default(source) {
  var vueParse = sfc.parse(source);
  var domAst = vueParse.descriptor.template.ast;
  var templateSource = domAst.loc.source;
  var startLine = domAst.loc.start.line;
  var newTemplateSource = insetVueAttr["default"](domAst, Array.from({
    length: startLine
  }).fill('').join('\n') + templateSource, this.resourcePath);
  var newContent = source.replace(templateSource, newTemplateSource);
  return newContent;
}