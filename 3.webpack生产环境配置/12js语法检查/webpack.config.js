const path = require('path');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      /*
          语法检查：eslint-loader eslint
            注意：只检查自己写的源代码，第三方的库不用检查的
            设置检查规则：
              packjack.json中eslintConfig中设置
              airbnb --> eslint-config-airbnb eslint-plugin-import eslint

          实际上和视频中相比已经失败了，不知道啥原因，暂时放弃eslint规范了
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader, // 单独生产 css 文件
          'css-loader', // 将 css 编程js
          { // css兼容性处理
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss
                require('postcss-preset-env')(),
              ],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
  ],

  // 模式
  mode: 'development', // development production
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true, // 启动gzip压缩
    port: 3001, // 服务器端口
    open: true, // 自动打开浏览器
  },
};
