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

// 设置nodejs环境变量：决定使用browserslist的什么环境
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
            use: [
              /*
                开启多进程打包，
                进程启动大概为600ms，进程通信也有开销
                只有工作小号事件比较长，才需要多进程打包
              */
              {
                loader: 'thread-loader',
                options: {
                  workers: 2
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  // 预设：指示babel做怎么样的兼容性处理
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
              }
            ]
          },
          {
            // 处理图片资源,
            // 问题：默认处理不了html中img图片
            test: /\.(jpg|png|gif)/,
            // 使用一个loader,下载url-loader和file-loader
            loader: 'url-loader',
            options: {
              // 图片大小小于8kb，就会被base64处理
              // 优点：减少请求数量（减轻服务器压力）
              // 缺点：图片体积会更大（文件请求速度更慢）
              limit: 8 * 1024,
              // 问题，因为url-loader默认使用es6模块化解析，但是html引入图片是common.js,因此关闭es6模块化解析
              esModule: false,
              name: '[hash:10].[ext]',
              outputPath: 'imgs'
            }
          },
          // 打包其他资源（除了html、js、css资源以外的资源）
          {
            exclude: /\.(css|less|js|html|jpg|png|gif)$/,
            // 处理html文件的img图片（负责引入img， 从而能被url-loader进行处理）
            loader: 'file-loader',
            options: {
              // 给图片进行重命名
              // [hash:10]表示取hash值得前10位
              // [ext]表示取源文件的扩展名
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
    // 详细的plugins配置
    // html-webpack-plugin
    // 功能：默认创建一个空的HTML，自动引入打包输出的所有资源（js/css）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制'./src/index.html'文件，并自动引入打包输出的所有资源（js/css）
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

  // 开发服务器 devServer： 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点： 只会在内存中编译打包，不会有任何输出
  // 启动DevServer指令为： npx webpack-dev-server
  // 当修改了webpack配置，新配置想要生效，必须重启webpack服务
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true, // 启动gzip压缩
    port: 3001, // 服务器端口
    open: true, // 自动打开浏览器
    hot: true // 开启HMR功能
  },
  devtool: 'cheap-source-map'
}