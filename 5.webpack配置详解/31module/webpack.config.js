
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'built.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.css/,
        // 多個loader使用use
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        // 排除node_modules下的js文件
        exclude: /node_modules/,
        // 只檢查 src 下的文件
        include: path.resolve(__dirname, 'src'),
        // 優先執行
        enforce: 'pre',
        // 延後執行
        enforce: 'post',
        // 單個loader使用loader
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin()
  ],

  // 模式
  mode: 'development',
}