1. buffer
   > Buffer【Buffer 类似于数组】
   >> Buffer.from(String, encoding)
   >> Buffer.from(Array)
   >> Buffer.from(ArrayBuffer, offset, length)
   >> Buffer.alloc(ByteLength, fill, encoding)
   >> Buffer.allocUnsafe(ByteLength)
   >> BufferObject.write(String, offset, length, encoding)
   >> BufferObject.toString(encoding, start, end)

   >> BufferObject.toJSON()
   >> Buffer.concat([BufferObejct1, BufferObject2][, totalLength])
   >> BufferObject.compare(otherBufferObject)
   >> BufferObject.copy(targetBuffer, targetStart, sourceStart, sourceEnd)
   >> BufferObject.slice【指向同一块内存】
   >> buf1.equals(buf2)【比较值是否相等】
2. 写入大整数
   最高支持 48 位无符号整数，小端对齐。
   buf.writeUIntLE(value, offset, byteLength[, noAssert])

   最高支持 48 位无符号整数，大端对齐。
   buf.writeUIntBE(value, offset, byteLength[, noAssert])
   
3. events
   > EventEmitter
   >> emitter.on
   >> emitter.addListener
   >> emitter.removeListener
   >> emitter.removeAllListeners
   >> emitter.once
   >> emitter.listenerCount
   >> emitter.emit
4. process
   事件
   > exit
   > beforeExit 事件循环没有排队的，退出；但是可以在回调里继续执行，导致不退出 
   > uncaughtException 未捕获的异常
   > Signal 收到信号时触发；POSIX 信号名，如 SIGINT、SIGUSR1 等。
5. Stream
   大致分为四类：
   1. Readable 可读流
   2. Writeable 可写流
   3. Duplex 可读可写流
   4. Transform 在写入基础上的可读流
   所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
   > data - 当有数据可读时触发。
   > end - 没有更多的数据可读时触发。
   > error - 在接收和写入过程中发生错误时触发。
   > finish - 所有数据已被写入到底层系统时触发。

