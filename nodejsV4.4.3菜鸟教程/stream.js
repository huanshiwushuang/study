var fs = require('fs');
var data = '';

var readerStream = fs.createReadStream('note.md')

readerStream.setEncoding('utf8')

readerStream.on('data', function (chunk) {
  data += chunk
})
readerStream.on('error', function () {
  console.log(err.stack)
})
readerStream.on('end', function () {
  console.log('读取完毕')
  console.log(data)
})




var data2 = '更好的明天'
var writerStream = fs.createWriteStream('test.js');
writerStream.write(data2, 'utf8');
writerStream.end();
writerStream.on('finish', function () {
  console.log('写入完成')
})
writerStream.on('error', function (err) {
  console.log(err.stack)
})
console.log('程序执行完毕')