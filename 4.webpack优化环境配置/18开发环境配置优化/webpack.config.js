
/* 
  HMR：hot module replacement 热模块替换 / 模块热替换
    作用：一个模块发生变换，只会重新打包这一个模块（而不是打包所有模块）
      极大提升构建速度

      样式文件：可以使用HMR功能：因为style-loader内部实现了
      js文件：默认不使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
        注意：HMR功能对js处理，只能处理非入口js文件的其他文件
      html文件：默认不使用HMR功能，同时导致问题：html文件不能热更新了
        解决：修改entry入口，将html文件引入
*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

module.exports = {
  // 入口起点
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
  }
}