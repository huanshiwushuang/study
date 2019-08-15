var events = require('events'); 
var emitter = new events.EventEmitter(); 

emitter.on('error', function () {
  console.log(arguments)
})

emitter.emit('error'); 