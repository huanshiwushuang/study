// ssh-keygen -t rsa -b 2048 -f filename -C "备注信息"
// git log -p --after={2018-12-29} --before={2019-01-01} --reverse --author=guohao --graph --online --no-merges
// git log --name-only --name-status
// git pull origin master --allow-unrelated-histories 【允许合并不相关的历史】
// git show commit-id 【查看某次提交的修改文件内容】
// git show --stat commit-id 【查看某次提交的修改文件列表】
// git check-ignore -v App.class 【检查哪一条配置忽略了文件】
// git add -f App.class 【-f 参数可以强行提交忽略的文件】
// git diff hash1 hash2 --stat  【git比较两次commit之间的差异文件】
// git diff hash1 hash2 filename  【查看具体文件不同之处】
// git remote origin set-url [url] 【修改远程仓库地址】
// git remote rm origin 【删除远程仓库地址】
// git remote add origin [url]  【添加远程仓库地址】
// git pull origin develop --allow-unrelated-histories  【允许合并不相关的历史】
// git config --global user.email   【配置email】
// git config --global user.name   【配置name】