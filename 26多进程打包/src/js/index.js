import { mul } from './test.js'
import '../css/index.less'

function sum (...args) {
    return args.reduce((p, c) => p + c, 0)
}

console.log(mul(2, 3))

console.log(sum(1, 2, 3, 4, 5))

/* 
    1. eslint不认识 window,navigator 等全局变量
        解决：修改package.json中eslintConfig配置
        "env": {
            "browser": true
        }
    2. sw代码必须运行在服务器上
        --> node.js
        -->
            npm i serve -g
            server -s build 启动服务器，将build目录下所有静态资源暴露出去
*/
// 注册serviceworker
// 处理兼容性问题
console.log(navigator.serviceWorker)
// if ('serviceworker' in navigator) {
//     console.log(321)
    window.addEventListener('load', () => {
        console.log(123)
        navigator.serviceWorker.register('/service-worker.js').then(() => {
            console.log('构建成功')
        }).catch(() => {
            console.log('构建失败')
        })
    })
// }
