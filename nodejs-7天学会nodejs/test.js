/*
 * @Author: your name
 * @Date: 2019-10-31 13:39:30
 * @LastEditTime: 2019-11-06 16:06:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \asd231d:\code\study\nodejs-7天学会nodejs\test.js
 */
var net = require('net')

var server = net
  .createServer(function(conn) {
    conn.on('data', function(data) {
      console.log(data.toString())
    })
  })
  .listen('10086')
