/*
 * @Author: your name
 * @Date: 2019-10-31 13:45:13
 * @LastEditTime: 2019-11-06 16:05:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \study\nodejs-7???nodejs\test2.js
 */
var net = require('net')
var options = {
  port: 10086,
  host: '127.0.0.1'
}

var client = net.connect(options, function() {
  client.write(
    [
      'GET / HTTP/1.1',
      'User-Agent: curl/7.26.0',
      'Host: www.baidu.com',
      'Accept: */*',
      '',
      ''
    ].join('\n')
  )
})

client.on('data', function(data) {
  console.log(data.toString())
  client.end()
})
