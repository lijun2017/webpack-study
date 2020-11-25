
const path = require('path')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // 入口起点
  entry: './src/js/index.js',

  // 输出
  output: {
    // 输出文件名
    filename: 'js/built.js',
    // 输出路径，绝对路径
    // __dirname nodejs 的变量，当前问价的目录的绝对路径
    path: path.resolve(__dirname, 'build')
  },

  // loader 配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同的loader处理
      {
        // 匹配哪些
        test: /\.css/,
        // 使用的哪些loader
        use: [
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          // 'style-loader',

          // 这个loader取代style-loader. 作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件变成common.js模块，里面的内容是字符串
          'css-loader'
        ]
      }
    ]
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
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ],

  // 模式
  mode: 'development', // development production

  // 开发服务器 devServer： 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点： 只会在内存中编译打包，不会有任何输出
  // 启动DevServer指令为： npx webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true, // 启动gzip压缩
    port: 3001, // 服务器端口
    open: true // 自动打开浏览器
  }
}