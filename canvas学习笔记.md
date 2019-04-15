来源：[Canvas API详解](https://www.cnblogs.com/eaglesour/p/8948215.html)
1. 获取画笔
    > ctx = canvas.getContext("2d")  
2. 绘制路径
    > ctx.beginPath(); // 开始路径绘制  
    > ctx.moveTo(20, 20); // 设置路径起点，坐标为(20,20)  
    > ctx.lineTo(200, 20); // 绘制一条到(200,20)的直线  
    > ctx.lineWidth = 1.0; // 设置线宽  
    > ctx.strokeStyle = '#CC0000'; // 设置线的颜色  
    > ctx.stroke(); // 进行线的着色，这时整条线才变得可见  
3. 绘制矩形
    > ctx.fillStyle = 'yellow';  
    > ctx.fillRect(50, 50, 200, 100);   
    > ctx.strokeRect(10,10,200,100);   
    > ctx.clearRect(100,50,50,50);  
4. 绘制文本
    > // 设置字体  
    > ctx.font = "Bold 20px Arial";   
    >> font简写顺序，至少要有 size 和 family：  
    >> font-style  
    >> font-variant  
    >> font-weight  
    >> font-size/line-height  
    >> font-family  

    > // 设置对齐方式  
    > ctx.textAlign = "left";  
    > // 设置填充颜色  
    > ctx.fillStyle = "#008600";   
    > // 设置字体内容，以及在画布上的位置  
    > ctx.fillText("Hello!", 10, 50);   
    > // 绘制空心字  
    > ctx.strokeText("Hello!", 10, 100);  

5. 绘制圆形和扇形
    > ctx.arc(x, y, radius, 开始弧度[**0代表x正半轴**], 结束弧度, 是否逆时针);
    > ctx.beginPath();   
    > ctx.arc(60, 60, 50, 0, Math.PI*2, true);   
    > ctx.fillStyle = "#000000";   
    > ctx.fill();  

    > ctx.beginPath();   
    > ctx.arc(60, 60, 50, 0, Math.PI*2, true);   
    > ctx.lineWidth = 1.0;   
    > ctx.strokeStyle = "#000";   
    > ctx.stroke();  
6. 线性渐变
    > var myGradient = ctx.createLinearGradient(0, 0, 0, 160);   
    > myGradient.addColorStop(0, "#BABABA");   
    > myGradient.addColorStop(1, "#636363");  
    > 使用方法：  
    > ctx.fillStyle = myGradient;  
    > ctx.fillRect(10,10,200,100);
7. 设置阴影
    > ctx.shadowOffsetX = 10; // 设置水平位移  
    > ctx.shadowOffsetY = 10; // 设置垂直位移  
    > ctx.shadowBlur = 5; // 设置模糊度  
    > ctx.shadowColor = "rgba(0,0,0,0.5)"; // 设置阴影颜色  
    > ctx.fillStyle = "#CC0000";   
    > ctx.fillRect(10,10,200,100);  
8. 绘制图片 参数不同，含义不同，详见[HTML5 canvas drawImage() 方法](http://www.w3school.com.cn/html5/canvas_drawimage.asp)
    > context.drawImage(img,x,y);  
    > context.drawImage(img,x,y,width,height);  
    > ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);    

9.  ctx.getImageData(x, y, width, height)
    > 复制指定区域的 imageData 数据。  
    > 返回的 imageData 对象的data数组是每一个像素点的 rgba 在 0 ~ 255 范围内的值。每四个元素组成一个像素的rgba值  
    
10. context.putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
    > dirtyX: 可选。水平值（x），以像素计，在画布上放置图像的位置。  
    > dirtyY: 可选。水平值（y），以像素计，在画布上放置图像的位置。  
    > dirtyWidth: 可选。在画布上绘制图像所使用的宽度。  
    > dirtyHeight: 可选。在画布上绘制图像所使用的高度。
11. canvas.toDataURL(type, encoderOptions);
    > type: 图片格式，默认为 image/png  
    > encoderOptions: 
    >> 在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。
12. save 和 restore 
    > save方法用于保存上下文环境，restore方法用于恢复到上一次保存的上下文环境。  

13. 