/* 
  缓存：
    babel缓存
      cacheDirectory: true
      --> 让第二次打包更快
    文件资源缓存
      hash：每次webpack构建时会生成一个唯一的hash值
        问题：因为js和css同时使用一个hash值。
          如果重新打包，会导致所有缓存失效（可能我只改动一个文件）
      chunkhash：chun生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
        问题：js和css的hash值还是一样的
          因为css是再js中被引入的，所以同属于一个chunk
      contenthash：根据文件的内容生成hash值，不同文件hash值一定不一样，
      --> 让代码上线运行缓存更好使用
*/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('path')

// 设置nodejs环境变量
process.env.NODE_ENV = 'development'

module.exports = {
  // 入口起点
  entry: ['./src/js/index.js'],

  // 输出
  output: {
    // 输出文件名
    filename: 'js/built.[contenthash:10].js',
    // 输出路径，绝对路径
    // __dirname nodejs 的变量，当前问价的目录的绝对路径
    path: path.resolve(__dirname, 'build')
  },

  // loader 配置
  module: {
    rules: [
      /* 
        正常来说，一个文件只能被一个loader处理。
        当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
          先执行eslint，在执行babel
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先处理该loader
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
      {
        oneOf: [
          // 详细loader配置
          // 不同文件必须配置不同的loader处理
          {
            // 匹配哪些
            test: /\.css/,
            // 使用的哪些loader
            use: [
              // 这个loader取代style-loader. 作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
              // 将css文件变成common.js模块，里面的内容是字符串
              'css-loader'
            ]
          },
          {
            // 匹配哪些
            test: /\.less/,
            // 使用的哪些loader
            use: [
              // 这个loader取代style-loader. 作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
              // 将css文件变成common.js模块，里面的内容是字符串
              'css-loader',
              // 将less文件编译成css
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
                  // 指定兼容性做到哪个版本浏览器
                  targets: {
                    chrome: '60',
                    firefox: '60',
                    ie: '9',
                    safari: '10',
                    edge: '17'
                  }
                }
              ]],
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
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

  // plugins的配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
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
