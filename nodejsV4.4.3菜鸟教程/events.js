var events = require('events')
var eventEmitter = new events.EventEmitter()

eventEmitter.on('test', function () {
  console.log('调用了 test')
})

setTimeout(function () {
  eventEmitter.emit('test')
}, 2000)
