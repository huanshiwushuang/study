;~ https://www.autoitclipboardlauncher.com/hotkeyset-vs-hotstringset/
#include-once
#include <Misc.au3>
#include <..\lib\HotString.au3>
#include <..\lib\_RunWaitGet.au3>


;~ 单例模式
If _Singleton("1605770393107", 1) == 0 Then
    MsgBox(0, "Warning", "already running");
    Exit;
EndIf

;~ 资源文件夹创建
Local $assertsDir = FileGetLongName(@TempDir) & '\gh-sjc';

If DirGetSize($assertsDir) == -1 Then
	DirCreate($assertsDir);
EndIf

;~ 文件安装
FileInstall('.\qjs.exe', $assertsDir & '\');

;~ 定义执行 JS 方法
Func js($str)
	$str = _RunWaitGet($assertsDir & '\qjs.exe -e console.log(' & $str & ')' , 1, '', @SW_HIDE);
	Return StringRegExpReplace($str, '[\r\n]', '');
EndFunc

;~ 自定义逻辑
HotStringSet("sjc{space}",  sendSJC);

Func sendSJC()
	Local $ms = js( 'Date.now().toString(36)' );
	Send('{BS 4}' & $ms);
EndFunc

While 1
    Sleep(10)
WEnd
