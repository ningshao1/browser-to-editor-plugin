"use strict";

var runner = require('loader-runner');

var fs = require('fs');

var path = require('path');

runner.runLoaders({
  resource: 'src/test/test.vue',
  loaders: ['E:\\working\\fta-admin-vue3\\jumpCodePlugin\\src\\webpack\\vLoader.js?path=vvvv'],
  context: {
    minimize: true
  },
  readResource: fs.readFile.bind(fs)
}, function (err, result) {});