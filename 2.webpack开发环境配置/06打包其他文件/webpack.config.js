
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口起点
  entry: './src/index.js',

  // 输出
  output: {
    filename: 'built.js',
    path: path.resolve(__dirname, 'build')
  },

  // loader 配置
  module: {
    rules: [
      // 详细loader配置
      {
        test: /\.css/,
        use: [ 
          'style-loader',
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
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  // 模式
  mode: 'development' // development production
}