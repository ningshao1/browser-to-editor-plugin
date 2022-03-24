const http = require('http')
const portfinder = require('portfinder')
const launch = require('launch-editor')

function createServer(requsetOpenLaunchEditor) {
  const app = http.createServer((req, res) => {
    const urlParams = new URL(req.url, 'http://127.0.0.1')
    let status = 200
    if (urlParams.pathname === '/_open-edit_') {
      status = 200
      requsetOpenLaunchEditor && requsetOpenLaunchEditor(urlParams.searchParams)
    } else status = 404
    res.writeHead(status, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE,X-URL-PATH,x-access-token',
    })
    res.end(status === 200 ? 'OK' : 'ERR')
  })
  return app
}

export default function openLaunchEditor(callback, code) {
  const app = createServer(parmas => {
    const path = parmas.get('path')
    const col = parmas.get('col')
    const line = parmas.get('line')
    launch(`${path}:${line}:${col}`, code || undefined, (fileName, errorMsg) => {
      if (errorMsg) {
        throw errorMsg
      }
    })
  })
  portfinder
    .getPortPromise({
      port: 5000,
    })
    .then(port => {
      app.listen(port, () => {
        callback && callback(port)
      })
    })
    .catch(err => {
      throw err
    })
}
