/* 
  loader: 1.  下载   2.  使用（配置loader）
  plugins: 1.   下载  2.  引入  3.  使用
*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口起点
  entry: './src/js/index.js',

  // 输出
  output: {
    filename: 'built.js',
    path: path.resolve(__dirname, 'build')
  },

  // plugins的配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  // 模式
  mode: 'production',

  externals: {
    // 拒绝jquery被打包进来 忽略库名 -- npm包名
    jquery: 'jquery'
  }
}