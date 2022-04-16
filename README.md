<h1 align="center">browser-to-editor-plugin</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/browser-to-editor-plugin" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/v/browser-to-editor-plugin" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/browser-to-editor-plugin" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/dt/browser-to-editor-plugin" alt="NPM Downloads" /></a>
  <!-- <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/node/browser-to-editor-plugin" alt="Node.js" /></a> -->
  <a href="https://github.com/ningshao1/browser-to-editor-plugin/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/ningshao1/browser-to-editor-plugin" alt="License" /></a>
</p>S
### 安装

`npm i browser-to-editor-plugin -S`

### 使用

### vite

```javascript
import vue from '@vitejs/plugin-vue'
import { viteBrowserToEditor } from 'browser-to-editor-plugin'
defineConfig({
...
plugins:[
viteBrowserToEditor(),
vue(),
]
...
})
```

**注意**：请保证`viteBrowserToEditor`插件要在`vue`插件前面

### webpack

```javascript
const { webPpackBrowserToEditor } = require('browser-to-editor-plugin')
module.exports = {
  plugins: [
      ....
      new webPpackBrowserToEditor()
      ...
      ],
}
```