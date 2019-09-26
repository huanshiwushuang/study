<!--
 * @Description: 限于当时所知，不保证内容完全正确
 * @Author: guohao
 * @Date: 2019-09-26 22:50:58
 * @LastEditTime: 2019-09-27 00:35:44
 * @LastEditors: Please set LastEditors
 -->
# Version 1.1.26.0 1 #
阅读约定 & 说明
1. **&** 表示 和
2. **|** 表示 或
3. **;** 是AHK的单行注释符号，符号放在最前面
4. /* */ 是AHK的多行注释符号，代码放在中间

## 初学者向导
1. AutoHotkey [官网](https://autohotkey.com/)
2. AutoHotkey [中文网站](https://www.autoahk.com)
3. AHK 两大长处【热键、热字符串】
   > 热键：你按下某些键，就可以自动执行某些操作  
   > 热字符串: 你按顺序按下某些键，就可以自动执行某些操作  
   > 热键举例：【按下 **Ctrl+j** 就会自动输入 **My First Script**】
   ```
   ^j::
        Send, My First Script
    return
   ```
   > 热字符串举例：【输入hw，然后 **回车 **|** 空格 | Tab**，hw 就会被替换为 **hello,world** 】
   ```
   ::hw::
        hello,world
    return
   ```
4. 部分按键表示
   > 大部分按键表示就是如你所想的对应键的英文名  
   > 在热字符串中，用花括号 **{}** 包裹
   
    | 代码 | 对应按键                                           |
    | ---- | -------------------------------------------------- |
    | ^    | Ctrl                                               |
    | +    | shift                                              |
    | !    | alt                                                |
    | #    | Win(Windows 徽标键)                                |
    | &    | 用于连接两个按键(含鼠标按键) 合并成一个自定义热键. |
    
5. 上下文相关联的操作【可以只在指定的软件上才触发 **热键 | 热字符串**】
   > 举例：【只在窗口标题为 **无标题 - 记事本** 的窗口中才能触发 **Ctrl+j**】
   ```
    #SingleInstance Force 

    #IfWinActive 无标题 - 记事本
        ^j::
            MsgBox 123
        return
    ;重置、取消上面的【#IfWinActive】的影响，防止影响后续代码
    #IfWinActive

    ^k::
        MsgBox 456
    return
   ```
6. 指令：【以 **#** 开头的，比如 #SingleInstance 、#IfWinActive】
   > 指令可以改变代码运行环境  
   > 部分指令说明：  
   
   | 指令                                          | 参数                     | 参数含义                                                                               |
   | --------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------- |
   | #SingleInstance<br>【运行已在运行的AHK时】    | [Force \| Ignore \| Off] | 跳过对话框，使用本次运行 <br> 跳过对话框，忽略本次运行<br>关闭单实例运行，允许多实<br> |
   | #IfWinActive <br>【如果指定条件的窗口被激活】 | [, WinTitle, WinText]    | 略                                                                                     |
7. 
