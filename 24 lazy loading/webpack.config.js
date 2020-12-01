const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

// 设置nodejs环境变量：决定使用browserslist的什么环境
process.env.NODE_ENV = 'development'

module.exports = {
  // 入口起点
  entry: './src/js/index.js',

  // 输出
  output: {
    // 输出文件名
    // [name]: 取文件名
    filename: 'js/[name].[contenthash:10].js',
    // 输出路径，绝对路径
    // __dirname nodejs 的变量，当前问价的目录的绝对路径
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
  devtool: 'cheap-source-map'
}