/*
 * @Author: your name
 * @Date: 2020-03-31 19:57:21
 * @LastEditTime: 2020-04-17 19:29:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frp_gui_windowsd:\code\study\JS奇淫巧技.js
 */
// 1、判断浏览器是否打开了控制台（DevTools）
// https://stackoverflow.com/questions/7798748/find-out-whether-chrome-console-is-open
// 方法1：利用控制台打开的时候打印某些对象，会调用该对象的 toString 方法实现
// 方法2：利用控制台打开的时候打印某些HTML对象，会调用该对象的 id 方法实现，配合defineProperty
// 缺点，需要定时判断，否则无法知道是否关闭了控制台
// 网址：https://ahaochan.github.io/posts/Check_whether_the_F12_console_is_turned_on.html

// 2、阻止用户调试代码 
// https://segmentfault.com/a/1190000012359015
// https://samy.pl/
// 1、debugger + 时间差 + 定时器 + resize
// 2、chrome 的打印【重写 toString 和 id】
// 3、outerWidth 和 innerWidth
// 4、混淆加密
// 5、手机状态下，似乎没法？
// 6、控制台是否打开，多次循环 console.log() 时间差不一样。
// https://github.com/AepKill/devtools-detector  试试

// 3、用户是否打开了 控制台？
// https://www.zhihu.com/question/24188524

// 4、chrome 保存文件到本地
// https://blog.csdn.net/i042416/article/details/82556800
// (function (console) {
//     console.save = function (data, filename) {
//         if (!data) {
//             console.error('Console.save: No data')
//             return;

//         }
//         if (!filename) filename = 'console.json'
//         if (typeof data === 'object') {
//             data = JSON.stringify(data, undefined, 4)
//         }
//         var blob = new Blob([data], {
//                 type: 'text / json'
//             }),
//             e = document.createEvent('MouseEvents'),
//             a = document.createElement('a')
//         a.download = filename
//         a.href = window.URL.createObjectURL(blob)
//         a.dataset.downloadurl = ['text / json', a.download, a.href].join(': ')
//         e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
//         a.dispatchEvent(e)
//     }
// })(console)

// 5、JS 注入，https 只能加载 127.0.0.1 和 localhost 的js
// (function (openUrl, injectionUrl) {
//     var w = window.open(openUrl);
//     w.addEventListener('DOMContentLoaded', function () {
//         w.location.href = "javascript:(function(){var script=document.createElement('script');script.src='"+injectionUrl+"';document.body.appendChild(script);})();"
//     })
// })('https://dynview.vcbeat.top/mergersList', 'http://localhost:8080/injection.js')

