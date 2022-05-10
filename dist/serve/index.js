"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = openLaunchEditor;

var http = require('http');

var portfinder = require('portfinder');

var launch = require('launch-editor');

function createServer(requsetOpenLaunchEditor) {
  var app = http.createServer(function (req, res) {
    var urlParams = new URL(req.url, 'http://127.0.0.1');
    var status = 200;

    if (urlParams.pathname === '/_open-edit_') {
      console.time('testTime')
      status = 200;
      requsetOpenLaunchEditor && requsetOpenLaunchEditor(urlParams.searchParams);
      console.timeEnd('testTime')
    } else status = 404;

    res.writeHead(status, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE,X-URL-PATH,x-access-token'
    });
    res.end(status === 200 ? 'OK' : 'ERR');
  });
  return app;
}

function openLaunchEditor(callback, code) {
  var app = createServer(function (parmas) {
    var path = parmas.get('path');
    var col = parmas.get('col');
    var line = parmas.get('line');
    launch("".concat(path, ":").concat(line, ":").concat(col), code || undefined, function (fileName, errorMsg) {
      if (errorMsg) {
        throw errorMsg;
      }
    });
  });
  portfinder.getPortPromise({
    port: 5000
  }).then(function (port) {
    app.listen(port, function () {
      callback && callback(port);
    });
  })["catch"](function (err) {
    throw err;
  });
}