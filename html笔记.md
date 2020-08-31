1. [字符实体之 空格 '&nbsp &emsp &ensp &thinsp &zwnj &zwj'](http://www.oicqzone.com/pc/2015083122336.html)
2. [零宽字符](https://mp.weixin.qq.com/s?__biz=MzA5NDIzNzY1OQ==&mid=2735616980&idx=1&sn=f0c0f8839fdb3eddf953c1414eb74ffc&chksm=b6ab356081dcbc7611cb3db4b7d4b5760346d58b771a3b9a46b85ec3325c318e2845cb645df0&mpshare=1&scene=1&srcid=0807aCsmzdxKu2AMqS9PnoVb&sharer_sharetime=1596763156662&sharer_shareid=b384eb8761bf4d6b7b5bb83c78ea4def&key=6c296afc1e26cebccfe6e0138c39a1f8916643d0f48fa73e31f8ec9131d5bbe412f9299f74d6eb5fe20e8b6f96a81e3b5d9e071017744acd6b4abe8a7d5255a598cf8341c6b4529c9a623c978cec0875&ascene=1&uin=OTA2NDcwNDMy&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=A9W6q3exItnSo6qZK5Zsz8A%3D&pass_ticket=hfzqiMTks0i%2FS33j13mlPm%2BKgKd2XWmikVAL5tQgwreWGCBlFRue5%2BKZ3qzJlskf)

零宽字符主要有以下几类：

零宽度空格符 (zero-width space) U+200B : 用于较长单词的换行分隔。
零宽度非断空格符 (zero width no-break space) U+FEFF : 用于阻止特定位置的换行分隔。
零宽度连字符 (zero-width joiner) U+200D : 用于阿拉伯文与印度语系等文字中，使不会发生连字的字符间产生连字效果。
零宽度断字符 (zero-width non-joiner) U+200C : 用于阿拉伯文、德文、印度语系等文字中，阻止会发生连字的字符间的连字效果。
左至右符 (left-to-right mark) U+200E : 用于在混合文字方向的多种语言文本中（例：混合左至右书写的英语与右至左书写的希伯来语），规定排版文字书写方向为左至右。
右至左符 (right-to-left mark) U+200F : 用于在混合文字方向的多种语言文本中，规定排版文字书写方向为右至左。
利用零宽字符不可见的特性，我们也可以玩出一些骚效果。

3. 123