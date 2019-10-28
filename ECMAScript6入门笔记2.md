<!--
 * @Author: your name
 * @Date: 2019-10-28 16:56:37
 * @LastEditTime: 2019-10-28 17:49:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \asd231d:\code\study\ECMAScript6入门笔记2.md
 -->
[在线阅读](http://es6.ruanyifeng.com/)
# 4. 字符串的扩展  
- **repeat()**---(number 字符串重复次数)    
  1. 参数小数会取整
  2. 负数 或 infinity 会报错
  3. 0 ~ -1 之间的小数取整为 -0，视同为0
  4. NaN 视为0；字符串会转为数字
- **padStart()、padEnd()**---(number 字符串补全生效的最大长度, string 用于不全的字符串)  
  1. param1 不会让字符串变得更短
  2. param2 省略默认用空格补全
  3. 常用于数值补全位数

# 12. Symbol【特点：生成全局不重复的数据，可作为key或者value】
- **常用API**
  1. **Symbol()**
  2. **Symbol.for()**
  3. **Symbol.keyFor()**
  4. **Symbol().description** 【Symbol.prototype.description】
  5. **Symbol.hasInstance**【作为key，指向一个内部方法】  
    对象的Symbol.hasInstance属性，指向一个内部方法。  
    当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。  
    比如，foo instanceof Foo在语言内部，实际调用的是Foo\[Symbol.hasInstance](foo)。
    ```
    class MyClass {
        [Symbol.hasInstance](foo) {
            return foo instanceof Array;
        }
    }
    
    [1, 2, 3] instanceof new MyClass() // true
    ```
    
  6. **Symbol.isConcatSpreadable**【对象的属性，布尔值】
    > 在使用 concat 方法时，规定数组 或者 对象的展开行为  
    > 数组是默认展开的；对象是默认不展开的  
    > true：展开  
    > false: 不展开
  7. **Symbol.species**【作为一个key，指向一个内部方法】
   ```
    class MyArray extends Array {}

    const a = new MyArray(1, 2, 3);
    // 生成的衍生对象，不要和 hasInstance 混淆了
    const b = a.map(x => x);
    const c = a.filter(x => x > 1);

    b instanceof MyArray // true
    c instanceof MyArray // true
   ```
   > b 和 c 都是 MyArray 的实例  
   改写为：【是 get 取值器】
   ```
   class MyArray extends Array {
        static get [Symbol.species]() { 
            // 默认返回的是 this
            return Array;
        }
    }
   ```
   
  8. 
- 