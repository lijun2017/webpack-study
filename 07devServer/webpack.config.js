/* 
  loader: 1.  下载   2.  使用（配置loader）
  plugins: 1.   下载  2.  引入  3.  使用
*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

module.exports = {
  // 入口起点
  entry: './src/index.js',

  // 输出
  output: {
    // 输出文件名
    filename: 'built.js',
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
          'style-loader',
          // 将css文件变成common.js模块，里面的内容是字符串
          'css-loader'
        ]
      },
      // 打包其他资源（除了html、js、css资源以外的资源）
      {
        exclude: /\.(css|js|html)$/,
        // 处理html文件的img图片（负责引入img， 从而能被url-loader进行处理）
        loader: 'file-loader',
        options: {
          // 给图片进行重命名
          // [hash:10]表示取hash值得前10位
          // [ext]表示取源文件的扩展名
          name: '[hash:10].[ext]'
        }
      }
    ]
  },

  // plugins的配置
  plugins: [
    // 详细的plugins配置
    // html-webpack-glugins
    // 功能：默认创建一个空的HTML，自动引入打包输出的所有资源（js/css）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制'./src/index.html'文件，并自动引入打包输出的所有资源（js/css）
      template: './src/index.html'
    })
  ],

  // 模式
  mode: 'development', // development product

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