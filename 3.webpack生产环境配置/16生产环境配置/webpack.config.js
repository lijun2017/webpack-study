const path = require('path');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 设置nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'

const commonCssLoader = [
  MiniCssExtractPlugin.loader, // 单独生产 css 文件
  'css-loader', // 将 css 编程js

  // 需要在package.json中配置browserslist，指定兼容性的范围
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
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.css/,
        use: commonCssLoader
      },
      {
        test: /\.less/,
        use: [
          ...commonCssLoader,
          'less-loader'
        ],
      },
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
        test: /\.js$/,
        exclude: /node_modules/,
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
          ]]
        }
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
          limit: 80 * 1024,
          // 问题，因为url-loader默认使用es6模块化解析，但是html引入图片是common.js,因此关闭es6模块化解析
          esModule: false,
          // 给图片进行重命名
          // [hash:10]表示取hash值得前10位
          // [ext]表示取源文件的扩展名
          name: '[hash:10].[ext]',
          outputPath: 'imgs'
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img， 从而能被url-loader进行处理）
        loader: 'html-loader'
      },
      // 打包其他资源（除了html、js、css资源以外的资源）
      {
        exclude: /\.(css|js|html|jpg|png|gif)$/,
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
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    // 压缩css
  ],

  // 生成模式会自动压缩js代码
  mode: 'production', // development production
}
