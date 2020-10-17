/* 
  index.js: webpack入口七点文件

  1.运行指令：
    开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
                      入口              输出地址          开发环境
    生产环境：webpack ./src/index.js -o ./build/built.js --mode=poduction
  
  2.结论：
    webpack可以出来js和json,不能处理css/img等其他资源
    生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化
    生产环境比开发环境多一个压缩js代码
*/

import './index.css'

import data from './data.json'
console.log(data)

function add(x, y) {
  return x + y
}

console.log(add(1, 2))
