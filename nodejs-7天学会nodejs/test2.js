/*
 * @Author: your name
 * @Date: 2019-10-31 13:39:30
 * @LastEditTime: 2019-10-31 13:44:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \asd231d:\code\study\nodejs-7天学会nodejs\test.js
 */
var fs = require('fs')

function copy(src, dst) {
  fs.writeFileSync(dst, fs.readFileSync(src))
}

function main(argv) {
  copy(argv[0], argv[1])
}

main(process.argv.slice(2))
