
const path = require('path')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // 入口起点
  entry: './src/js/index.js',

  // 输出
  output: {
    filename: 'js/built.js',
    path: path.resolve(__dirname, 'build')
  },

  // loader 配置
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          // 这个loader取代style-loader. 作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },

  // plugins的配置
  plugins: [
    new HtmlWebpackPlugin({
      // 复制'./src/index.html'文件，并自动引入打包输出的所有资源（js/css）
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ],

  // 模式
  mode: 'development', // development production

  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true, // 启动gzip压缩
    port: 3001, // 服务器端口
    open: true // 自动打开浏览器
  }
}