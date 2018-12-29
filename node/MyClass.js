var EventEmitter = require('events').EventEmitter;

var MyClass = function () {

}

MyClass.prototype.__proto__ = EventEmitter.prototype;

var a = new MyClass

a.on('asd', function () {
    console.log(a instanceof EventEmitter)
})

a.emit('asd');
