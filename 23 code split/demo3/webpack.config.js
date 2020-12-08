const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
process.env.NODE_ENV = 'development'

module.exports = {
  // 入口起点
  entry: './src/js/index.js',

  // 输出
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, 'build')
  },


  // plugins的配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  /* 
    可以将node_modules中代码单独打包成一个chunk最终输出
    自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  // 模式
  mode: 'production', // development production
}