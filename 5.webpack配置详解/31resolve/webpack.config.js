
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
        // 多個loader使用use
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

  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名
    alias: {
      $css: path.resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json'],
    // 告诉 webpack 解析模块是去哪个目录
    modules: [path.resolve(__dirname, '../../node_modules'), 'node_modules']
  },

  // 模式
  mode: 'development',
}