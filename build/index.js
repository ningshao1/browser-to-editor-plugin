const fs = require('fs')
const path = require('path')
try {
  const exists = fs.accessSync(path.resolve(__dirname, '../dist/ui'), fs.constants.F_OK)
} catch (error) {
  fs.mkdirSync(path.resolve(__dirname, '../dist/ui'))
}
fs.copyFileSync(path.resolve(__dirname, '../src/ui/index.html'), path.resolve(__dirname, '../dist/ui/index.html'))
