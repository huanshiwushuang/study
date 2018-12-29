var fs = require('fs');

fs.readFile('data.json', 'utf8', function (err, data) {
    console.log(data)
})

var stream = fs.createReadStream('data.json');

stream.on('data', function (data) {
    console.log(data);
})

stream.on('end', function () {
    console.log('读取完毕');
})