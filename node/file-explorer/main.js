var fs = require('fs'),
    stdin = process.stdin,
    stdout = process.stdout
    
;

function log() {
    console.log(...arguments);
}
fs.readdir(process.cwd(), function (err, files) {
    var stats = [];

    if (!err) {
        file(0);
    } else {
        log('\033[31;42m 未找到文件 \033[0m');
    }
    
    function file(i) {
        var filename = files[i];
        fs.stat(__dirname+'/'+filename, function (err, stat) {
            if (err) {return}
            stats[i] = stat;

            if (stat.isDirectory()) {
                log((i+1) + '\t\033[36m' + filename + '/\033[39m');
            } else {
                log((i+1) + '\t\033[90m' + filename + '\033[39m');
            }
            i++;
            if (i == files.length) {
                read();
            } else {
                file(i);
            }
        })
    }
    function read() {
        log('');
        stdout.write('\t\033[33m请做出你的选择：\033[39m');
        stdin.resume();
        stdin.setEncoding('utf-8');
        stdin.on('data', option);
    }
    function option(data) {
        data = data.trim();
        var num = Number(data)-1, filename = files[num];
            if (filename && data.length > 0) {
                stdin.pause();

                if (stats[num].isDirectory()) {
                    fs.readdir(process.cwd() + '/' + filename, function (err, files) {
                        if (!err) {
                            log('');
                            log('\t数量：' + files.length);
                            files.forEach(function (item) {
                                log('\t-\t' + item);
                            })
                            log('');
                        }
                    })
                } else {
                    fs.readFile(__dirname+'/'+filename, 'utf8', function (err, data) {
                        log('');
                        log('\033[90m' + data.replace(/(.*)/g, '  $1') + '\033[39m');
                    })
                }
            } else {
                stdout.write('\t请做出你的选择：');
            }
    }
})







