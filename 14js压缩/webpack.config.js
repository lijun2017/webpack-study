const path = require('path');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: path.resolve(__dirname, 'build'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],

  // 生成模式会自动压缩js代码
  mode: 'production', // development production
}
