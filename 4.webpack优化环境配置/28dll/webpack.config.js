
const path = require('path')
const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  // 入口起点
  entry: './src/js/index.js',

  // 输出
  output: {
    filename: 'built.js',
    path: path.resolve(__dirname, 'build')
  },

  // plugins的配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/mainfest.json')
    }),
    // 将某个文件打包出去，并再html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js')
    })
  ],

  // 模式
  mode: 'production',
}