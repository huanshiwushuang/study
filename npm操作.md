1. 查看全局已安装模块
    > npm list -g --depth 0

2. 查看全局包的安装路径
    > npm root -g

3. 更新模块
    > npm update moduleName
4. npx 查找局部安装，或者在$path 查找全局安装的模块来运行，没找到默认会安装，安装的用完即删除 [阮一峰npx](http://www.ruanyifeng.com/blog/2019/02/npx.html)
    > --no-install，未找到也不安装  
    > --ignore-existing，忽略本地的同名模块，强制安装使用远程模块  
    > -c 指定所有执行交由 npx 执行，  
    >> 例如：npx -p lolcatjs -p cowsay -c 'cowsay hello | lolcatjs'  
    >> 如果没有 -c 就会将 | 后面的交流 shell 执行
    > -p 指定要安装的模块
5. 