
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',

  output: {
    filename: 'built.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin()
  ],

  resolve: {
    alias: {
      $css: path.resolve(__dirname, 'src/css')
    },
    extensions: ['.js', '.json'],
    modules: [path.resolve(__dirname, '../../node_modules'), 'node_modules']
  },

  // 模式
  mode: 'development',

  devServer: {
    contentBase: path.resolve(__dirname, 'build'), // 运行代码的目录
    watchContentBase: true, // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
    watchOptions: {
      ignored: /node_modules/ // 忽略文件
    },
    compress: true, // 启动gzip压缩
    port: 5000, // 服务器端口
    host: 'localhost', // 域名
    open: true, // 自动打开浏览器
    hot: true, // 开启HMR功能
    clientLogLevel: 'none', // 不要显示启动服务器日志信息
    quiet: true, // 除了一些基本启动信息以外，其他内容都不要显示
    overlay: false, // 如果出错了，不要全屏提示~

    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 一旦deServer（5000）服务器接收到 /api/xxx 的请求，就回吧请求转发到另一个服务器（3000）
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：将 /api/xxx --> /xxx (去掉/api)
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}