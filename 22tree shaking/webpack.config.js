
/* 
  tree shaking: 去除无用代码
    前提：1. 必须使用ES6模块化   2. 开启production环境

    在package.json中配置
      "sideEffects": false 所有代码都没有副作用(都可以进行tree shaking)
        问题： 可能会把css / @babel/polyfill (副作用)文件干掉
      "sideEffects": ["*.css"] 保证css不会被干掉
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
        // 优先处理该loader
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
