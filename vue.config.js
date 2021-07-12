
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({languages:["java","python"],
      features:["coreCommands","find"]}), // Place it here
    ]
  },
}