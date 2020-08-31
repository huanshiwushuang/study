<!--
 * @Author: your name
 * @Date: 2020-07-20 21:59:50
 * @LastEditTime: 2020-07-24 15:10:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frp_gui_windowsd:\code\study\新时期的nodejs入门\note.md
--> 
# 常用 FS 方法
1. fs.readFile(file, options, callback)
2. fs.writeFile(file, data, options, callback)
3. fs.stat(file, callback)  获取文件属性
4. fs.fstat(Integer fileDescription, callback)  获取文件属性，区别在于第一个参数是整型，常搭配 open 方法返回的 fd 使用
5. fs.readdir(path, callback(err, array))

6. fs.access
7. fs.appendFile
8. fs.chmod
9.  fs.chown
10. fs.close
11. fs.fchmod
12. fs.fchown
13. fs.fdatasync
14. fs.fsync
15. fs.ftruncate
16. fs.futime
17. fs.link
18. fs.lstat
19. fs.mkdir
20. fs.open
21. fs.read
22. fs.readlink
23. fs.rename
24. fs.rmdir
25. fs.symlink
26. fs.truncate
27. fs.unlink
28. fs.unwatchFile
29. fs.utimes
30. fs.watch
31. fs.watchFile
32. fs.write

# 常用 HTTP 方法
1. http.get()
2. https.createServer({
        key: file,
        cert: file
3. }, callback)

# 常用 child_process 方法
1. child_process.spawn()--->基础，其他方法基于此
2. child_process.exec()
3. child_process.fork()
4. child_process.execFile()