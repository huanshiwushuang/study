require('http').createServer(function (req, res) {
    console.log(req.headers)
    res.writeHead(200, {
        'Content-Type': 'image/png'
    })
    require('fs').createReadStream('test.png').pipe(res);
}).listen(8080)