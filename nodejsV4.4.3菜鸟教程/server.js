var http = require('http')

http.createServer(function (req, rsp) {
  rsp.writeHead(200, {
    'Content-Type': 'text/html'
  });

  rsp.end('内容');
}).listen(8080, function () {
  console.log(arguments)
})