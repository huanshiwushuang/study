var fs = require('fs')

fs.readFile('./pipe.js', function (err, data) {
  if (err) return console.log(err)
  console.log('异步读取：\n'+data)
})

try {
  var data = fs.readFileSync('./pipe.js')
  console.log('同步读取：\n'+data)
} catch (err) {
  console.log(err)
}

console.log('readFile：程序执行完毕')