const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

process.env.NODE_ENV = 'development'

module.exports = {
  // 入口起点
  entry: {
    // 多入口：有一个入口，最终输出就有一个bundle -->多页面
    main: './src/js/index.js',
    test: './src/js/test.js'
  },

  // 输出
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, 'build')
  },

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