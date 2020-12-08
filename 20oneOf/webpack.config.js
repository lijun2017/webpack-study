
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

module.exports = {
  // 入口起点
  entry: ['./src/js/index.js'],

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
    /* 
      正常来说，一个文件只能被一个loader处理。
      当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
        先执行eslint，在执行babel
    */
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        oneOf: [
          {
            test: /\.css/,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            test: /\.less/,
            use: [
              'style-loader',
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
                  useBuiltIns: 'usage',
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
              ]]
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
    })
  ],

  // 模式
  mode: 'development', // development production
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true, // 启动gzip压缩
    port: 3001, // 服务器端口
    open: true, // 自动打开浏览器
    hot: true // 开启HMR功能
  },
  devtool: 'cheap-source-map'
}
