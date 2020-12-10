
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',

  output: {
    filename: 'built.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin()
  ],
  
  // 模式
  mode: 'production',

  resolve: {
    alias: {
      $css: path.resolve(__dirname, 'src/css')
    },
    extensions: ['.js', '.json'],
    modules: [path.resolve(__dirname, '../../node_modules'), 'node_modules']
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSize: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunks最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数据
      maxInitialReests: 3, // 入口js文件最大并行请求数量
      automaticNamedelimiter: '~', // 名称链接符
      name: true, // 可以使用命名规则
      cacheGroups: { // 分割chunk的组
        vendors: {
          test: []
        }
      }
    }
  }
}