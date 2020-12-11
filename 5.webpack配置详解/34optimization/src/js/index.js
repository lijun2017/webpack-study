import '$css/index.css'
console.log('index.js被加载了')

import(/* webpackChunkName: 'a' */'./a').then(({add}) => {
    console.log(add(1, 2))
})
