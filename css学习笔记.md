1. 顺序不能反，否则 background-size 不生效  
   > background: url(/static/imgs/loading/loading.gif);  
   > background-size: cover;
2. 弹性布局
    1. container
       - flex-direction: row row-reverse column column-reverse
       - flex-wrap: nowrap wrap wrap-reverse
       - flex-flow: flex-direction flex-wrap
       - justify-content: flex-start flex-end center space-between    space-around
       - align-items:     flex-start flex-end center baseline         stretch
       - align-content:   flex-start flex-end center space-between    space-around stretch 【定义多跟轴线对齐方式】
    2. item
       - order: 0 (integer)
       - flex-grow: 0 (integer)
       - flex-shrink: 1 (integer)
       - flex-basis: auto (pixel)
       - flex: none | auto | (flex-grow)
       - align-self: auto flex-start flex-end center baseline stretch

3. css 选择器权重计算。参考 [详解CSS中的选择器优先级顺序](https://www.jb51.net/css/470518.html)
   > 将权重分为 4 个部分。命名为 a.b.c.d  
   > 每个单独的选择器，每出现一次就在 a b c d 其中一个位置 +1。最后从左到右比较数字大小决定优先级  
   > !important 拥有最高优先级。都有的情况下再计算 a b c d 和 位置先后的覆盖
   1. 在 a 的位置+1：行内样式 style=""。
   2. 在 b 的位置+1：ID 选择器
   3. 在 c 的位置+1：class 选择器、伪类选择器(:hover)
   4. 在 d 的位置+1：Tag 标签选择器、伪元素选择器(:first-child)
   > 举例：
   > - #id .class span：权重为 0.1.1.1
   > - style="color: red"：权重为 1.0.0.0
   > - .class div:hover {}：权重为 0.0.2.1
4. BFC
   1. 123
5. https://www.cnblogs.com/autismtune/p/5210116.html 原理？清除浮动的技
6. https://blog.csdn.net/xm1037782843/article/details/80708533
7. linear-gradient 线性渐变 IE10+
   > -webkit- -o- -moz-  
   > background: linear-gradient(direction, color-stop1, color-stop2, ...);  
   > 默认从上到下，颜色值支持 rgba  
   > 有前缀的情况下，标准的语法（必须放在最后）
   1. 使用关键词。会有低版本浏览器的不统一问题。方向关键词也可以写两个，见 [RUNOOB.COM](http://www.runoob.com/try/try.php?filename=trycss3_gradient-linear_diagonal)  
      > background: -webkit-linear-gradient( **left**, red , blue); /* Safari 5.1 - 6.0 */  
      > background: -o-linear-gradient( **right**, red, blue); /* Opera 11.1 - 12.0 */  
      > background: -moz-linear-gradient( **right**, red, blue); /* Firefox 3.6 - 15 */  
      > background: linear-gradient( **to right**, red , blue); /* 标准的语法 */  
   2. 使用 deg 角度（推荐）。同样会有新旧标准的问题。
      > background: linear-gradient(angle, color-stop1, color-stop2);  
      > 新标准：0deg === 从下到上，顺时针。[新标准图片](http://www.runoob.com/wp-content/uploads/2014/07/7B0CC41A-86DC-4E1B-8A69-A410E6764B91.jpg)  
      > 旧标准：0deg === 从左到右，逆时针。
   3. repeating-linear-gradient() 重复的线性渐变
      > background: repeating-linear-gradient(red, yellow 10%, green 20%); /* 标准的语法 */  
      > 说明：这里的百分比的意思是指从 10% 处开始黄色，到 20% 处结束为绿色，进行过渡。  
      > 线性渐变似乎和背景色不一样，无法被背景色覆盖。
   5. 
8. radial-gradient 径向渐变 IE10+
