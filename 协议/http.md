1. X-Content-Type-Options 响应
   响应首部相当于一个提示标志，被服务器用来提示客户端一定要遵循在 Content-Type 首部中对 MIME 类型 的设定，而不能对其进行修改。这就禁用了客户端的 MIME 类型嗅探行为，换句话说，也就是意味着网站管理员确定自己的设置没有问题。
   否则返回的JS文件就算MIME类型是 image/png ，也会被浏览器嗅探作为 JS 执行
   [MIME 类型混淆攻击](https://www.cnblogs.com/zhouyideboke/p/10491773.html)
2. 