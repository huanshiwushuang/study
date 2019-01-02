var net = require('net');

var socket = net.connect(8080, '127.0.0.1');
socket.setEncoding('utf8');

socket.on('connect', function () {
    console.log(123);
    socket.write('NICK mynick\r\n');
    socket.write('USER mynick 0 * :realname\r\n');
    socket.write('JOIN #node.js\r\n');
})

socket.on('data', function (data) {
    console.log(data);
})

socket.on('error', function () {
    console.log(arguments)
})

socket.on('close', function () {

})