<h1 align="center">browser-to-editor-plugin</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/browser-to-editor-plugin" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/v/browser-to-editor-plugin" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/browser-to-editor-plugin" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/dt/browser-to-editor-plugin" alt="NPM Downloads" /></a>
  <a href="https://github.com/ningshao1/browser-to-editor-plugin/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/ningshao1/browser-to-editor-plugin" alt="License" /></a>
</p>

## 说明

一键直接跳转到本地 IDE 源码 支持 vite 、 webpack 、taro

## 效果

![image](https://raw.githubusercontent.com/ningshao1/browser-to-editor-plugin/master/case.gif)

## 安装

```Bash
npm i browser-to-editor-plugin -SD
```

## 使用

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
const { webpackBrowserToEditor } = require('browser-to-editor-plugin')
module.exports = {
  chainWebpack: (config) => {
    ...
   process.env.CODE_ENV === 'dev' && config.plugin('toEdit').use(webpackBrowserToEditor)
   ...
}
```

### taro

```javascript
/** config/dev.js */

const { webpackBrowserToEditor } = require('browser-to-editor-plugin')
module.exports = {
  h5: {
    ...
    webpackChain(chain) {
      chain.plugin('toEdit').use(webPpackBrowserToEditor)
      ...
      ...
    },
  },
}
```

插件添加后，启动项目左下角会有一个锁的图标点击开启即可使用

**注意**：在`taro`中只支持 H5 端使用该插件

### 注意项

- 请保证该插件只在`dev`环境中运行
- 在浏览器中模拟使用移动端时,不会显示遮罩层，直接点击想要跳转的元素即可

- taro 暂时只测试了 react 版本的 vue 版本的没有加入测试，需要的自行测试
