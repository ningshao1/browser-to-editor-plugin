"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _serve = _interopRequireDefault(require("../serve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    name: 'browser-to-editor',
    apply: 'serve',
    buildStart: function buildStart() {
      (0, _serve["default"])(function (port) {
        defaultPort = port;
      }, option.code);
    },
    transform: function transform(source, filePath) {
      if (/\.vue$/.test(filePath) && !/\/node_modules\//.test(filePath)) {
        return vueLoader.call(_objectSpread(_objectSpread({}, this), {}, {
          resourcePath: filePath
        }), source);
      }

      if (/\.(jsx?)|(tsx)$/.test(filePath) && !/\/node_modules\//.test(filePath)) {
        return reactLoader.call(_objectSpread(_objectSpread({}, this), {}, {
          resourcePath: filePath
        }), source);
      }
    },
    transformIndexHtml: function transformIndexHtml(html) {
      return html.replace('</html>', "".concat(code.replace(/__port__/, defaultPort), "\n</html>"));
    }
  };
}