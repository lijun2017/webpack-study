
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    // 文件名称（指定名称+目录）
    filename: 'built.js',
    // 输出文件目录（将来所有资源输出的公共目录）
    path: path.resolve(__dirname, 'build'),
    // 所有资源的引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    publicPath: '/',
    chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称
    library: '[name]', // 整个库向外暴露的变量名
    librartTarget: 'window' // 变量名添加到那个上 browser
    // librartTarget: 'global' // 变量名添加到那个上 node
    // librartTarget: 'commonjs'
  },

  plugins: [
    new HtmlWebpackPlugin()
  ],

  // 模式
  mode: 'development',
}