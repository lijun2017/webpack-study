
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',

  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, 'build'),
    chunkFilename: 'js/[name].[contenthash:10].js'
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

      // 以下配置为默认配置
      /* 
      minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSize: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunks最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数据
      maxInitialReests: 3, // 入口js文件最大并行请求数量
      automaticNamedelimiter: '~', // 名称链接符
      name: true, // 可以使用命名规则
      cacheGroups: { // 分割chunk的组
        // node_modules文件会被打包到vendors组的chunks中。 --> vendors~xxx.js
        // 满足上面的公共规则则，如：大小超过30kb，至少被引用一次
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          // 要提取的chunk最少被引用2次
          minChunks: 2,
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，二不是重新打包模块
          reuseExistingChunk: true
        }
      }
     */
    },
    // 将当亲模块记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方法：js和css
      new TerserWebpackPlugin({
        cache: true, // 开启缓存
        parallel: true, // 开启多进程打包
        sourceMap: true, // 如果在生产环境中使用 source-maps，必须设置为 true
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      })
    ]
  }
}