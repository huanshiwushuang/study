var fs = require('fs');

var reader = fs.createReadStream('input.txt');
var writer = fs.createWriteStream('output.txt');

reader.pipe(writer);


var zlib = require('zlib');
reader.pipe(zlib.createGzip()).pipe(fs.createWriteStream('input.txt.gz'))

console.log('程序执行完毕');

