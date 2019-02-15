// 1、判断浏览器是否打开了控制台（DevTools）
// 方法1：利用控制台打开的时候打印某些对象，会调用该对象的 toString 方法实现
// 方法2：利用控制台打开的时候打印某些HTML对象，会调用该对象的 id 方法实现，配合defineProperty
// 缺点，需要定时判断，否则无法知道是否关闭了控制台
// 网址：https://ahaochan.github.io/posts/Check_whether_the_F12_console_is_turned_on.html

