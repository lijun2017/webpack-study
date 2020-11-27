
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
    // 输出文件名
    filename: 'js/built.js',
    // 输出路径，绝对路径
    // __dirname nodejs 的变量，当前问价的目录的绝对路径
    path: path.resolve(__dirname, 'build')
  },

  // loader 配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同的loader处理
      {
        // 匹配哪些
        test: /\.css/,
        // 使用的哪些loader
        use: [ 
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成common.js模块，里面的内容是字符串
          'css-loader'
        ]
      },
      {
        // 匹配哪些
        test: /\.less/,
        // 使用的哪些loader
        use: [
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成common.js模块，里面的内容是字符串
          'css-loader',
          // 将less文件编译成css
          'less-loader'
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
          // 给图片进行重命名
          // [hash:10]表示取hash值得前10位
          // [ext]表示取源文件的扩展名
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
    })
  ],

  // 模式
  mode: 'development', // development production

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