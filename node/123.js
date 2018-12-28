var http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    throw new Error('hahaah');
    res.end('<marquee>123</marquee>');
})

server.listen(8080, function () {
    console.log(123);
});

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log(12312312);
    process.exit(1);
})