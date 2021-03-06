"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var path = require('path');

var fs = require('fs');

var openLaunchEditor = require('../serve');

var code = fs.readFileSync(path.resolve(__dirname, '../ui/index.html'), 'utf-8');
var defaultPort = 5000;

var browserToEditorPlugin = function () {
  function browserToEditorPlugin() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, browserToEditorPlugin);

    this.code = props.code;
  }

  _createClass(browserToEditorPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _compiler$options$mod;

      (_compiler$options$mod = compiler.options.module.rules).push.apply(_compiler$options$mod, [{
        test: /\.vue$/,
        use: {
          loader: path.resolve(__dirname, '../loader/vueLoader.js')
        },
        include: [path.resolve('src')],
        exclude: /node_modules/
      }, {
        test: /\.jsx?$/,
        use: {
          loader: path.resolve(__dirname, '../loader/reactLoader.js')
        },
        include: [path.resolve('src')],
        exclude: /node_modules/
      }]);

      openLaunchEditor["default"](function (port) {
        defaultPort = port;
      }, this.code);
      compiler.hooks.compilation.tap('browserToEditorPlugin', function (compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function (data, cb) {
          var html = data.html.replace('</html>', "".concat(code.replace(/__port__/, defaultPort), "\n</html>"));
          data.html = html;
        });
      });
    }
  }]);

  return browserToEditorPlugin;
}();

var _default = browserToEditorPlugin;
exports["default"] = _default;