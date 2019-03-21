// 全文搜索关键词：【重点、不懂】
// http://es6.ruanyifeng.com/#docs/intro

// 1、暂时性死区  typeof 不再百分百安全

// 2、ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
// ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。
// 浏览器的实现可以不遵守上面的规定，有自己的行为方式。

// 3、ES6 的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。

// 4、const 之于 对象。如果真的想将对象冻结，应该使用Object.freeze方法。

// 5、ES6 一共有 6 种声明变量的方法： var function let const import class

// 6、var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性
// 重点

// 解构赋值：解构赋值允许指定默认值。let [foo = true] = [];默认值可以引用解构赋值的其他变量，但该变量必须已经声明
// 注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

// 8、如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
// function f() {
//     console.log('aaa');
// }
// let [x = f()] = [1];

// 9、解构不仅可以用于数组，还可以用于对象。let { foo, bar } = { foo: "aaa", bar: "bbb" }; 真实的非简写格式是：let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };

// 10、如果变量名与属性名不一致，必须写成下面这样。
// let { foo: baz } = { foo: 'aaa', bar: 'bbb' }; 考虑理解为 foo as baz
// baz // "aaa"

// 11、解构也可以用于嵌套结构的对象。
// let obj = {
//     p: [
//         'Hello',
//         { y: 'World' }
//     ]
// };
// let { p: [x, { y }] } = obj;
// x // "Hello"
// y // "World"

// 12、对象解构可以重复有相同名字进行赋值：let { p, p: [x, { y }] } = obj;
// 对象解构：冒号前面是匹配的名字模式，后面才是变量

// 13、对象的解构也可以指定默认值。生效的原则同数组的解构。 第6
// var { x = 3 } = {};
// var { x: y = 3 } = {};

// 14、如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错
// 报错
// let {foo: {bar}} = {baz: 'baz'};

// 15、因为 JavaScript 引擎会将{x}理解成一个代码块；只有不将大括号写在行首，避免 JavaScript 将其解释为代码块
// 错误的写法
// let x;
// {x} = {x: 1};
// 正确的写法
// let x;
// ({x} = {x: 1});

// 16、下面的表达式虽然毫无意义，但是语法是合法的，可以执行。
// ({} = [true, false]);
// ({} = 'abc');
// ({} = []);

// 17、函数对象解构赋值：可以很方便地将现有对象的方法，赋值到某个变量。
// let { log, sin, cos } = Math;

// 18、由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
// let arr = [1, 2, 3];
// let {0 : first, [arr.length - 1] : last} = arr;

// 19、字符串的解构赋值：这是因为此时，字符串被转换成了一个类似数组的对象
// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值
// let {length : len} = 'hello';
// len // 5

// 20、解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
// let {toString: s} = 123;
// s === Number.prototype.toString // true

// let {toString: s} = true;
// s === Boolean.prototype.toString // true

// 21、解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。

// 22、函数的参数也可以使用解构赋值。函数参数的解构也可以使用默认值。
    // function add([x, y]){
    //     return x + y;
    // }
    // add([1, 2]); // 3

// 23、函数的参数：别忘记可以赋值默认值
// function ({x,y} = {x:0,y:0}) {
//   return x+y;
// }

// 24、ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
// 但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。
// 凡是不合适用括号的地方，能够不用括号的地方，用了括号看起来奇怪的地方都不要用括号，否则会报错。

// 25、可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。声明的时候不能使用圆括号。
// [(b)] = [3]; // 正确
// ({ p: (d) } = {}); // 正确
// [(parseInt.prop)] = [3]; // 正确

// 26、任何部署了 Iterator 接口的对象，都可以用for...of循环遍历，Map 结构原生支持 Iterator 接口
// for (let [key, value] of map) {
//     console.log(key + " is " + value);
// }
// 获取键名
// for (let [key] of map) {
// }
// // 获取键值
// for (let [,value] of map) {
// }

// 27、解构赋值之：nodejs的require导入加载指定导出 
// const { SourceMapConsumer, SourceNode } = require("source-map");



// 28、
// 29、
// 30、

// 字符串的扩展----------------------------------------------------------------------------

// 1、JavaScript 允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。
// "\u0061"
// 但是，这种表示法只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。

// 2、ES6 对超出 \u0000~\uFFFF 范围的双字节字符做出了优化。
// \u{xxxxx}  只要用花括号包围，皆可正确解释。

// 3、'\u{1F680}' === '\uD83D\uDE80'
// 不懂

// 4、JavaScript 共有 6 种方法可以表示一个字符
// '\z' === 'z'  // true
// '\172' === 'z' // true
// '\x7A' === 'z' // true
// '\u007A' === 'z' // true
// '\u{7A}' === 'z' // true

// 5、js 存储字符 UTF-16 两个字节，范围为 \u0000~\uffff 大于范围的认为为俩字符。
    // var s = "𠮷"; //码点是0x20BB7 ===> '𠮷'.codePointAt(0).toString(16)
    // s.length // 2
    // s.charAt(0) // ''
    // s.charAt(1) // ''
    // s.charCodeAt(0) // 55362
    // s.charCodeAt(1) // 57271

// 6、对于这种4个字节的字符，JavaScript 不能正确处理，字符串长度会误判为2，而且charAt方法无法读取整个字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。
// ES6 提供了codePointAt方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点
    // let s = '𠮷a';
    // s.codePointAt(0) // 134071
    // s.codePointAt(1) // 57271
    // s.codePointAt(2) // 97
    // codePointAt方法的参数，仍然是不正确的，你可以用for of 迭代字符串一个个求，这里用 for in 就完全不一样，注意区别。
    // 【重点】

// 7、codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

// 8、使用for in会遍历数组所有的可枚举属性；所以for in更适合遍历对象，不要使用for in遍历数组。
    // ES6中的for of更胜一筹.
    // 记住，for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值
    // 【重点】
    // 遍历字符串的时候，可以因此而区分出字符串的个数和字符串的长度的区别
    // for in 看的是字符串的字节数，俩字节认为一字符
    // for of 看的是字符串真实个数
    // for of遍历的只是数组内的元素，而不包括数组的原型属性method和索引name
    // Object.keys(myObject)获取对象的实例属性组成的数组，不包括原型方法和属性。

// 9、作用于数组的for-in循环除了遍历数组元素以外,还会遍历自定义属性
// 而for of 只会遍历数组本身的
// for...of 不会遍历key，只会遍历value，所以不能用于普通对象

// 10、codePointAt 和 fromCodePoint 是一对。主要用以弥补表示范围超出 \u000~\uffff 的字符的码点
// 区别于 charCodeAt 和 fromCharCode。
// 都是关于Unicode码点值的，区别是 超出范围 ffff的范围 charCodeAt分成了俩部分单独Unicode表示。
// String.fromCodePoint 多参数会合并成字符串

// 11、for of 这个遍历器最大的优点是可以识别大于0xFFFF的码点

// 12、stringObj.normalize()
// 某些欧洲字符，类似拼音的。Unicode提供字母和音调分开 和 在一起的两种码点
    // '\u01D1'==='\u004F\u030C'
    // '\u01D1'.length // 1
    // '\u004F\u030C'.length // 2
    // 虽然一样，但是js不能识别
// Unicode 正规化：'\u004F\u030C'.normalize() === '\u01D1'
// normalize 接受一个参数，参数4个可选值：
    // 1、NFC，默认参数，表示“标准等价合成”，返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
    // 2、NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
    // 3、NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，normalize方法不能识别中文。）
    // 4、NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

// 13、includes(), startsWith(), endsWith()。都支持第 2 个参数，指示开始搜索的位置。
    // includes()：包含之意。表示是否找到了字符串
    // endsWith()：第2个参数表示在下标前n个字符串中判断，不包括n



