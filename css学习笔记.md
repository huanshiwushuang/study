1. 顺序不能反，否则 background-size 不生效  
   > background: url(/static/imgs/loading/loading.gif);  
   > background-size: cover;
2. 弹性布局 IE10+ ---Flexbox用来做一维布局，Grid用来做二维布局
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
3. 网格布局---Flexbox用来做一维布局，Grid用来做二维布局。 [详细grid布局：推荐阅读](https://cloud.tencent.com/developer/article/1186773)
    > 最基础的入门 [5分钟学会 CSS Grid 布局](https://www.html.cn/archives/8506)  
    > 以下请参考 [显式网格、隐式网格](https://www.w3cplus.com/css3/difference-explicit-implicit-grids.html)  
    >> 手动定义了 grid-template-columns、grid-template-rows 的称为 显式网格   
    >> 实际 item 超出 创建的网格数量，则会创建隐式网格  
    >> repeat(4, calc(100%/4))---可采用 calc 计算  
    >> repeat(4, 1fr)---可采用 fr 单位自适应  
    >> repeat(3, 100px 20%)---列/行 100px 和 列/行 20%  重复 3 次 【重复轨道】  
    >> repeat(auto-fill, 100px)---创建宽度为 100px 的item占满整个行  
    >> repeat(auto-fit, 100px)---创建宽度为 100px 的实际item，不会有空的item（除非是 wrapper宽度不足 换行导致的）    
    >> grid-column-start 设置值 在显示网格范围之外，即可创建隐式网格 【具体规则，尚有疑惑】  
    >> grid-auto-rows: 100px | minmax(200px, auto)---隐式 轨道/行 尺寸---minmax限制最小和最大宽或高  
    >> grid-auto-columns: 100px | minmax(200px, auto)---隐式 轨道/列 尺寸---minmax限制最小和最大宽或高  
    >>> 横跨单元格（没看懂）  
    >>> grid-row-end: 2; grid-row-start: span 2;   
    >>> grid-column: 1 / span 2;   
    1. wrapper 容器
       - display: grid | inline-grid;
       - grid-template-columns: 100px 100px | repeat(2, 100px);---------两列，都宽为 100px
       - grid-template-rowss: 50px 50px | repeat(2, 50px);---------两行，都高为 50px
       - grid-auto-flow: row(一行一行的填充) | column(一列一列的填充) | dense(稠密算法，后面item尝试填充入之前的**足够大**的网格) | row dense | column dense  ---默认 row（[参考](https://blog.csdn.net/beijiyang999/article/details/80868095)）
    2. items 子元素
       - grid-column-start: 1;---定义元素列的 起始网格线
       - grid-column-end: 4;---定义元素列的 终止网格线
       - grid-row-end: 4;---定义元素行的 起始网格线
       - grid-row-end: 4;---定义元素行的 终止网格线
       - 【以上简写为：grid-column: 1 / 4】1到4列网格线

       > grid-column-gap  
       > grid-row-gap  
       > grid-gap  
       > grid-template-areas  
    3. 
    4. 
4. 新的尺寸单位 fr。或用于 Grid 布局，表示占据剩余空间的权重、比例 [参考](http://caibaojian.com/fr.html)  
   > grid-template-columns: repeat(4, 1fr);---共4列 每列 1fr。如果有 gap（间隙），不会像 25% 导致总的宽度超出，有点 box-sizing 的影子。  
5. css 选择器权重计算。参考 [详解CSS中的选择器优先级顺序](https://www.jb51.net/css/470518.html)
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
6. BFC
   1. 123
7. https://www.cnblogs.com/autismtune/p/5210116.html 原理？清除浮动的技
8. https://blog.csdn.net/xm1037782843/article/details/80708533
9.  linear-gradient 线性渐变 IE10+
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
   4. 
10. radial-gradient 径向渐变 IE10+
   > 可以定义 渐变中心、圆形 或 椭圆  
   > background: radial-gradient (center-position, **shape**[circle | ellipse] **size半径**[closest-side | farthest-side | closest-corner | farthest-corner | px], start-color, ..., last-color);  
   > 同样可以在颜色后面 空格定义 百分比：background: radial-gradient(red 5%, green 15%, blue 60%);  
   > [size参数的区别 示例](http://www.runoob.com/try/try.php?filename=trycss3_gradient-radial_size) 

   > circle的半径值是一个，ellipse有两个半径值，一个横向半径，一个纵向半径   
   > radial-gradient(circle 20px,color-stop,...);  
   > radial-gradient(ellipse 20px 40px,color-stop,...);

   > repeating-radial-gradient() 重复的径向渐变  
   > [运用示例](http://www.webfront-js.com/articaldetail/54.html)  
   > 【重点】 参数不同于 径向渐变在于 (circle 20px  at 50px 80px, color-stop...)。at 后面决定中心点。
11. clip: rect(0px 50px 200px 0px) 定义绝对定位的图片元素 如何裁剪。
   > 注意：: 如果先有"overflow：visible"，clip属性不起作用。  
   > 参数顺序：上 右 下 左。 
   > 【重点】左右的数值距离 都相对于 左；上下的数值距离 都相对于上。这里的相对方向区别于 border-image，border-image 的裁剪都是相对于各自裁剪方向的边的距离
12. border-image: url() 20px round ---IE11+
    > 四个对角是不受重复方式影响  
    > round会压缩（或伸展）图片大小使其正好在区域内显示
    2.  border-image-source: url()
    3.  border-image-slice: 10 20 30 40 ---上 右 下 左 裁剪的位置。没有单位，默认px
    4.  border-image-repeat: 重复方式---repeat、round、stretch（默认）。

13. 
14. 