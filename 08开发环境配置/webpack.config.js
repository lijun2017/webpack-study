
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

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
          'style-loader',
          // 将css文件变成common.js模块，里面的内容是字符串
          'css-loader'
        ]
      },
      {
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
      },
      {
        // 处理图片资源,
        // 问题：默认处理不了html中img图片
        test: /\.(jpg|png|gif)/,
        // 使用一个loader,下载url-loader和file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题，因为url-loader默认使用es6模块化解析，但是html引入图片是common.js,因此关闭es6模块化解析
          esModule: false,
          // 给图片进行重命名
          // [hash:10]表示取hash值得前10位
          // [ext]表示取源文件的扩展名
          name: '[hash:10].[ext]',
          outputPath: 'imgs'
        }
      },
      // 打包其他资源（除了html、js、css资源以外的资源）
      {
        exclude: /\.(css|less|js|html|jpg|png|gif)$/,
        // 处理html文件的img图片（负责引入img， 从而能被url-loader进行处理）
        loader: 'file-loader',
        options: {
          // 给图片进行重命名
          // [hash:10]表示取hash值得前10位
          // [ext]表示取源文件的扩展名
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
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