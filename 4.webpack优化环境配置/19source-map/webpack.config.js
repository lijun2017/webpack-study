
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

module.exports = {
  entry: ['./src/js/index.js'],

  // 输出
  output: {
    filename: 'js/built.js',
    path: path.resolve(__dirname, 'build')
  },

  // loader 配置
  module: {
    rules: [
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
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
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

/*
  source-map: 一种提供源代码到构建后代码映射技术(如果构建后代码出错了，通过映射可以追踪源代码错误)
    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    source-map：  外部
      错误代码准确信息 和 源代码的错误信息
    inline-source-map:  内联
      只生成一个内联source-map
      错误代码准确信息 和 源代码的错误信息
    hidden-source-map： 外部
      错误代码错误原因，但是没有错误位置
      不能追踪原代码错误，只能提示到构建后代码的错误位置
    eval-source-map：   内联
      每一个文件都生成对应的source-map，都在eval
      错误代码准确信息 和 源代码的错误信息
    nosources-source-map 外部
      错误代码准确信息，但是没有任何源代码信息
    cheap-source-map    外部
      错误代码准确信息 和 源代码的错误信息
      只能精确到行
    cheap-module-source-map 外部
      错误代码准确信息 和 源代码的错误信息
      module会将loader的source map 加入
      只能精确到行

    内联 和 外部 的区别： 1.外部生成了文件，内联没有 2.内联构建块一些

    开发环境：速度快，调试更友好
      速度快（eval>inline>cheap>....）
        eval-cheap-source-map
        eval-source-map
      调试更友好
        source-map
        cheap-module-source-map
        cheap-source-map
      --> eval-source-map / eval-cheap-module-source-map
    生产环境：原代码要不要隐藏，调试要不要更友好
      内联会让代码提及变大，所以再生产环境不用内联
      nosources-source-map 全部隐藏
      hidden-source-map 只隐藏原代码，会提示构建后错误代码

      --> source-map / cheap-module-source-map
*/