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

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  // 模式
  mode: 'production', // development production
  devtool: 'cheap-source-map'
}