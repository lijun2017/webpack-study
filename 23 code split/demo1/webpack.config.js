const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

// 设置nodejs环境变量：决定使用browserslist的什么环境
process.env.NODE_ENV = 'development'

module.exports = {
  // 入口起点
  // 单入口 -->单页面
  // entry: './src/js/index.js',
  entry: {
    // 多入口：有一个入口，最终输出就有一个bundle -->多页面
    main: './src/js/index.js',
    test: './src/js/test.js'
  },

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
    // 详细的plugins配置
    // html-webpack-plugin
    // 功能：默认创建一个空的HTML，自动引入打包输出的所有资源（js/css）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制'./src/index.html'文件，并自动引入打包输出的所有资源（js/css）
      template: './src/index.html'
    })
  ],

  // 模式
  mode: 'production', // development production
}