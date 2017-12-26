
// 简单情况：
// module.exports={
//     // 入口文件
//     entry: './a',
//     // 出口文件，路径
//     output:{
//         filename: 'pack.js',
//         path: __dirname
//     }
// }
//多页应用 多入口多出口
module.exports={
    entry:{
        home: './js/home.js',
        signup:'./js/signup.js'
    },
    output:{
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    }
}