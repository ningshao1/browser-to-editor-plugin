const babylon = require('@babel/parser')
const options = {
  sourceType: 'module',
  allowHashBang: true,
  ecmaVersion: Infinity,
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  startLine: 1,
  tokens: true,
  plugins: [
    'typescript',
    'estree',
    'jsx',
    'asyncGenerators',
    'classProperties',
    'doExpressions',
    'exportExtensions',
    'functionBind',
    'functionSent',
    'objectRestSpread',
    'dynamicImport',
    'nullishCoalescingOperator',
    'optionalChaining',
    ['decorators', { decoratorsBeforeExport: true }],
  ],
}

module.exports = function () {
  return {
    parse(code) {
      return babylon.parse(code, options)
    },
  }
}
