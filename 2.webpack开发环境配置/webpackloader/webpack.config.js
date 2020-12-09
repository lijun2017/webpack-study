/* 
webpack.config.js   webpack的配置文件
  作用：指示 webpack 做事，（运行 webpack 指令时，会加载里面的配置）

  所有构建工具都是基于 node.js 平台运行的——模块化采用 common.js 
*/


/* 
  loader: 1.  下载   2.  使用（配置loader）
  plugins: 1.   下载  2.  引入  3.  使用
*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
      }, {
        // 匹配哪些
        test: /\.less/,
        // 使用的哪些loader
        use: [
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成common.js模块，里面的内容是字符串
          'css-loader',
          // 将less文件编译成css
          'less-loader'
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
    })
  ],

  // 模式
  mode: 'development' // development production
}