var net = require('net');
var conn = net.createServer(function (conn) {
    conn.on('error', function (err) {
        console.log(err);
        process.exit(1);
    })
    
    setInterval(() => {
        conn.write('123');
    }, 1000)
})

conn.listen(400);