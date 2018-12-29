var fs = require('fs');
var path = require('path');

var stream = fs.createReadStream('data.json');

var files = fs.readdirSync(process.cwd());

// files.forEach(function (file) {
//     if (path.extname(file) === '.json') {
//         fs.watchFile(process.cwd()+'/'+file, function () {
//             console.log('文件：' + file + '发生改变');
//         })
//     }
// })

fs.watch(process.cwd(), function () {
    console.log(arguments);
})