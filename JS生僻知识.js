// 1、
with (obj) {
    //类似于扩展运算符，对象内的属性在作用域可直接访问  不建议使用，有作用域不明的不足
}

// 2、
// 原生 字符串 转 base64  支持ASCALL 其他考虑 encodeURIComponent 之后再转
btoa()
// 原生 base64 转 字符串  支持ASCALL 其他考虑 encodeURIComponent 之后再转
atoa()

// 3、
// 变相实现多行字符串
function f() {/*
    这是一个
    多行注释
  */}

// 4、
// 函数立即执行，只要让函数作为一个表达式即可，常见的加括号
(function(){})()    (function(){}())   +function(){}()  -function(){}() ~function(){}() !function(){}()

// 5、
// JavaScript 的标准规定，凡是使用别名执行eval，eval内部一律是全局作用域。
var e = eval;
eval.call(null, '...')
window.eval('...')
(1, eval)('...')
(eval, eval)('...')

// 6、
// 空位就是数组没有这个元素，所以不会被遍历到，而undefined则表示数组有这个元素，值是undefined，所以遍历不会跳过

// 7、
// == === > < 
// 这些比较规则为，同为字符串则常规思路；一边为数字，转为数字比较，布尔值转为数字比较；
// 一边为对象，对象通过valueOf和toString方法转为基本类型再比较
// 两边同为对象则 == 和 === 都不成立；> < 比较转为字符串。
// null和undefined不能转为数字和字符串
// NaN 谁比较都 false
// null == undefined

// 8、位运算符
// <<：相当于 * 2
// >>：相当于 / 2  取整
// >>>: 无符号右移

// 9、
// 正数的原码反码补码都相等；负数的反码，除符号位，其他按位取反，补码是反码+1

// 10、经过测试，windows计算器输出的二进制是补码；chrome console输出的二进制是原码

// 11、按位取反 ~ ：包括符号位都要取反
// 区别于反码，反码符号位不会取反【重点记忆】

// 12、猜测计算机运算过程是：  
//     原码-》补码（运算）-》原码

// 13、一直纠结于 
// '-'+(2**31).toString(2) === (2**31 | 0).toString(2)
// 即：为何 | 0之后 为负数
// 解：js中，位运算之后会转换为32位有符号整数，运算中以补码表示为：1000 0000 0000 0000 0000 0000 0000 0000
// 这个补码在32位中表示的是最小的负数。【参考补码原理 8位二进制的 -128的补码为 1000 0000】
// 总结：在类似于 1000 的补码中，符号位为1，其余为0的 原码转换为：-1000

// 以 8 位二进制为例。
// 正数的补码：0 000 0000   每+1，转为原码范围顺序为：0~127
// 负数的补码：1 000 0000   每+1，转为原码范围顺序为：-128~-1
// 这个规则推广到任意位数。原理猜测是没学过的同余原理

// 14、~~123.123 是取整最快的 位运算符  其他位运算也可以取整
// 位运算会调用 Number 转为数值

// 15、
// 三次异或：a ^= b ; b ^= a; a ^= b
// 可以交换 a 和 b的值，不用引入第三方变量。
// 还可以有：a = [b, b = a][0]
// 还可以有：a = a+b; b = a-b; a = a-b;  原理估计类似于三次异或

// 16、控制台相关
// $ $$ $_ $0~$4 $x inspect console[table | dir | dirxml | time | timeEnd | group | groupEnd | groupCollapsed | count | assert | trace] keys values 
// monitorEvents(object[, events]) ，unmonitorEvents(object[, events])
// dir dirxml copy clear 可直接调用的方法

// 17、对象返回原对象
// function isObject(value) {
//     return value === Object(value);
// }

// 18、Object.keys 和 Object.getOwnPropertyNames 的区别在于后者可以返回不可枚举属性名

// 19、Object 函数对象的一些静态方法
// Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
// Object.defineProperty()：通过描述对象，定义某个属性。
// Object.defineProperties()：通过描述对象，定义多个属性。

// Object.preventExtensions()：防止对象扩展。
// Object.isExtensible()：判断对象是否可扩展。
// Object.seal()：禁止对象配置和禁止扩展。
// Object.isSealed()：判断一个对象是否可配置。
// Object.freeze()：冻结一个对象。
// Object.isFrozen()：判断一个对象是否被冻结。

// Object.create()：该方法可以指定原型对象和给返回的对象添加getOwnPropertyDescriptors格式的属性，返回一个新的对象。
// Object.getPrototypeOf()：获取对象的Prototype对象。

// Object.keys 和 for in 与运算的区别在于是否能拿到原型链上的可迭代属性

// 20、当 configurable 为false时，writable 只能改为 false不报错。
//     configurable 和 writable 任一为true，都可以修改value
//      可配置性决定了目标属性是否可以被删除

// 21、animation和@key-frames 搭配  动画
//      transition 效果可以叠加 transition: background 0.5s ease-in,color 0.3s ease-out;    过渡
//      transform:translate   转变

// 22、常用方法
// forEach some every reduce reduceRight map filter find 
// indexOf lastIndexOf 第二个参数可表示搜索的开始位置 这两个方法不能用来搜索NaN的位置，即它们无法确定数组成员是否包含NaN 这是因为这两个方法内部，使用严格相等运算符（===）进行比较，而NaN是唯一一个不等于自身的值。

// 23、跨域手段  window.onhashchange事件
// jsonp  
// 设置主domain     协议+域名+端口 一致
// location.hash + iframe   更改 src指向，传递hash字符串
// window.name + iframe 更改iframe的指向（先指向其他域名，再指向本域名），然后通过name跨域传递字符串。
// postMessage html 跨域 
//      window.postMessage(data,origin)   origin也可以为 不限制同源策略* 或者 当前  origin /
//      对于同一 window 的句柄，监听 message 事件，用postMessage 发送消息。可以跨域传递数据，message回调函数的参数是 event 对象，event.data是数据

// 24、web workers
// var a = new Work('123.js');  参数代表运行的子线程的文件名
// 在 123.js 中发送消息的时候 直接调用 postMessage(data) 不需要第二个origin参数。