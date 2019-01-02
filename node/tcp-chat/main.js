var net = require('net');
var counter = 0;
var users = {};

var server = net.createServer(function (conn) {
    var nickname;
    counter++;
    conn.setEncoding('utf8');

    conn.write(`欢迎访问在线聊天系统，当前在线用户 ${counter} 人\r\n请输入您的昵称：`)

    conn.on('data', function (data) {
        data = data.replace('\r\n', '');
        if (!data.length) {
            return;
        }
        let buffer = new Buffer(data);
        if (buffer[0] && buffer[0].toString(16).indexOf('ef') != -1) {
            return;
        }
        console.log(`收到数据：`+data+'\t数据长度：'+data.length);
        
        // 如果是有效数据
        if (nickname) {
        } else {
            nickname = data;
            Object.keys(users).forEach(function (item) {
                users[item].conn.write(`用户 ${nickname} 已经登录\r\n`);
            })
            
            users[data] = {
                conn: conn,
                msg: []
            }
        }

    })

    conn.on('close', function () {
        counter--;
        console.log(`用户 ${users[nickname]} 退出登录，当前在线用户 ${counter} 人`);
        delete users[nickname]
    })
})

server.listen(8090, function () {
    console.log('端口监听在 8090');
});

global.asd = users;