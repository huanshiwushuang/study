console.log(123)
var count = 0

process.on('beforeExit', function () {
  setTimeout(function () {
    console.log(++count)
  }, 500)
})