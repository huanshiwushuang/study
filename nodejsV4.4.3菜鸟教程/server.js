var http = require('http')
var url = require('url')
var qs = require('querystring')

function start(routes) {
  http.createServer(function (req, rsp) {
    routes(url.parse(req.url).pathname)

    rsp.writeHead(200, {
      'Content-Type': 'text/html'
    });
  
    rsp.end('内容');
  }).listen(8080, function () {
    console.log('监听在 8080 端口')
  })
}

exports.start = start