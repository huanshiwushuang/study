var fs = require('fs')

fs.open('123', 'r', function (err, fd) {
  console.log(arguments)
  fs.fstat(fd, function (err, stats) {
    console.log(stats)

    fs.close(fd, function () {
      console.log('关闭')
    })
  })
  
})
