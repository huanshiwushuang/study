var http = require('http');

http.request({
    host: '127.0.0.1',
    port: 8080,
    url: '/url',
    method: 'POST'
}, function (socket) {
    var body = '';
    socket.setEncoding('utf8');

    socket.on('data', function (chunk) {
        body += chunk;
    })

    socket.on('end', function () {
        console.log(body);
    })

}).end(require('querystring').stringify({name: '哈哈'}));