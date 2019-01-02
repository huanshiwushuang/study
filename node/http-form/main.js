var http = require('http');

var server = http.createServer(function (req, res) {
    if (req.url == '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
    
        res.end(`
            <form method="POST" action="/url">
            <h1>My Form</h1>
            <fieldset>
            <label>Personal Information</label>
            <p>what is your name?</p>
            <input type="text" name="name">
            <p><button>Submit</button></p>
            </fieldset>
            </form>
        `)
    } else if (req.url == '/url' && req.method == 'POST') {
        // res.writeHead(200, {
        //     'Content-Type': 'text/html'
        // })
        // res.end('<div>you sent a <em>'+req.method+'</em> request</div>');

        var body = '';
        req.on('data', function (chunk) {
            body += chunk;
        })
        req.on('end', function () {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write('<meta charset="utf-8"><marquee>数据接收完成'+body+'</marquee>')
            res.end('<meta charset="utf-8"><marquee>数据接收完成，你的名字是：'+require('querystring').parse(body).name+'</marquee>')
        })
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        })
        res.end('<h6 style="font-size:100px;">404</h6>')
    }
}).listen(8080)