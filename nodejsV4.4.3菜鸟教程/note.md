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
   属性
   > process.execArgv 用于 node 的参数
   > process.argv 用于 被执行脚本 的参数；第一个是node的绝对路径，第二个是被执行脚本的绝对路径，之后的是传递给脚本的参数
   > process.stdout.write("Hello World!" + "\n");
   > process.execPath 执行的 路径
   > process.env 环境变量
   > process.exitCode 进程的推出代码
   > process.version Node 版本
   > process.versions Node核心依赖的库的 版本 Object 
   > process.pid
   > title 进程名，默认值为"node"，可以自定义该值。
   > process.arch CPU 架构
   > process.platform 平台系统
   方法
   > abort() 这将导致 node 触发 abort 事件。会让 node 退出并生成一个核心文件
   > chdir(directory) 改变当前工作进程的目录，如果操作失败抛出异常。
   > cwd 返回当前进程的工作目录
   > exit([code]) 使用指定的 code 结束进程。如果忽略，将会使用 code 0
   > getuid()
    获取进程的用户标识(参见 getuid(2))。这是数字的用户id，不是用户名。
    注意：这个函数仅在 POSIX 平台上可用(例如，非Windows和 Android)。
   > setuid(id)
    设置进程的用户标识（参见setuid(2)）。接收数字 ID或字串名字。果指定了群组名，会阻塞等待解析为数字 ID 。
    注意：这个函数仅在 POSIX 平台上可用(例如，非Windows和 Android)。
   > getgroups()
    返回进程的群组 iD 数组。POSIX 系统没有保证一定有，但是node.js 保证有。
    注意：这个函数仅在 POSIX 平台上可用(例如，非Windows和 Android)。
   > setgroups(groups)
    设置进程的群组 ID。这是授权操作，所以你需要有 root 限，或者有 CAP_SETGID 能力。
    注意：这个函数仅在 POSIX 平台上可用(例如，非Windows和 Android)。
   > initgroups(user, extra_group)
    读取 /etc/group ，并初始化群组访问列表，使用成员所在所有群组。这是授权操作，所以你需要有 root 权限，或者有CAP_SETGID 能力。
    注意：这个函数仅在 POSIX 平台上可用(例如，非Windows和 Android)。
   > kill(pid[, signal])
    发送信号给进程. pid 是进程id，并且 signal 是发送的信的字符串描述。信号名是字符串，比如 'SIGINT' 或'SIGHUP'。如果忽略，信号会是 'SIGTERM'。
   > memoryUsage()
    返回一个对象，描述了 Node 进程所用的内存状况，单位为节。
   > nextTick(callback)
   一旦当前事件循环结束，调用回调函数。
   > umask([mask])
    设置或读取进程文件的掩码。子进程从父进程继承掩码。如mask 参数有效，返回旧的掩码。否则，返回当前掩码。
   > uptime()
   返回 Node 已经运行的秒数。
   > hrtime()
    返回当前进程的高分辨时间，形式为 [seconds,nanoseconds]数组。它是相对于过去的任意事件。该值与日无关，因此不受时钟漂移的影响。主要用途是可以通过精确的间间隔，来衡量程序的性能。
    你可以将之前的结果传递给当前的 process.hrtime() ，会回两者间的时间差，用来基准和测量时间间隔。
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
6. util
   > inherits(constructor, superConstructor)
   > 
7. 
