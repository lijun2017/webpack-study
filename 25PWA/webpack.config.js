const path = require('path')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

/* 
  PWA：渐进式网络开发引用程序（离线可访问）
    workbox --> workbox-webpack-plugin
*/

process.env.NODE_ENV = 'development'

module.exports = {
  // 入口起点
  entry: ['./src/js/index.js'],

  // 输出
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: path.resolve(__dirname, 'build')
  },

  // loader 配置
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
      {
        oneOf: [
          {
            test: /\.css/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader'
            ]
          },
          {
            test: /\.less/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'less-loader'
            ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [[
                '@babel/preset-env',
                {
                  // 按需加载
                  useBuiltIns: 'usage',
                  // 指定core-js版本
                  corejs: {
                    version: 3
                  },
                  targets: {
                    chrome: '60',
                    firefox: '60',
                    ie: '9',
                    safari: '10',
                    edge: '17'
                  }
                }
              ]],
              cacheDirectory: true
            }
          },
          {
            test: /\.(jpg|png|gif)/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              esModule: false,
              name: '[hash:10].[ext]',
              outputPath: 'imgs'
            }
          },
          {
            exclude: /\.(css|less|js|html|jpg|png|gif)$/,
            loader: 'file-loader',
            options: {
              name: '[hash:10].[ext]',
              outputPath: 'media'
            }
          }
        ]
      }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      /* 
        1. 帮助serviceworker快速启动
        2. 删除旧的 servicewoker

        生成一个 servicewoker 配置
      */
      clientsClaim: true,
      skipWaiting: true
    })
  ],

  // 模式
  mode: 'production', // development production
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true, // 启动gzip压缩
    port: 3001, // 服务器端口
    open: true, // 自动打开浏览器
    hot: true // 开启HMR功能
  },
  devtool: 'cheap-source-map'
}