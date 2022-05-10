"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _serve = _interopRequireDefault(require("../serve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var fs = require('fs');

var path = require('path');

var _require = require('../loader'),
    vueLoader = _require.vueLoader,
    reactLoader = _require.reactLoader;

var code = fs.readFileSync(path.resolve(__dirname, '../ui/index.html'), 'utf-8');
var defaultPort = 5000;

function _default() {
  var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (_typeof(option) !== 'object') {
    throw 'Please pass in the correct configuration items';
  }

  return {
    name: 'vite-plugin-vue-jumpCode',
    apply: 'serve',
    buildStart: function buildStart() {
      (0, _serve["default"])(function (port) {
        defaultPort = port;
      }, option.code);
    },
    transform: function transform(source, filePath) {
      if (/\.vue$/.test(filePath)) {
        return vueLoader(source);
      }

      if (/\.jsx?$/.test(filePath)) {
        return reactLoader(source);
      }
    },
    transformIndexHtml: function transformIndexHtml(html) {
      return html.replace('</html>', "".concat(code.replace(/__port__/, defaultPort), "\n</html>"));
    }
  };
}