var http = require('http');

http.Server(function (req, res) {
    var buf = '';
    req.on('data', function (data) {
        console.log(new String(data));
    })

    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    res.end('<meta charset="utf-8"><form method="post"><input name="asd" value="哈"><button type="submit" onclicl="javascript:void(document.forms[0].submit());">submit</button></form>');

    req.on('end', function () {
        console.log(arguments);
    })
}).listen(8080)