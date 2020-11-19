#include-once
#include <HotString.au3>
#include <IE.au3>
#include <Misc.au3>

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
FileInstall('./polyfill.min.js', $assertsDir);
FileInstall('./sjc.html', $assertsDir);


;~ 启动IE
Local $ie = _IECreate($assertsDir & '\sjc.html', 0, 0, 1,1);

;~ 注入js执行
Func js($script)
	$ie.document.defaultView.execscript('document.scriptReturn = ' & $script);
	Return $ie.document.scriptReturn;
EndFunc

;~ 退出时，关闭IE
OnAutoItExitRegister('onExit');
Func onExit()
	_IEQuit($ie);
EndFunc


;~ 自定义逻辑
HotStringSet("sjc{space}",  sendSJC);
HotStringSet("sjc{enter}",  sendSJC);

Func sendSJC($str)
	Local $ms = js('Date.now().toString(36)');
    Send($ms);
EndFunc


While 1
    Sleep(10)
WEnd
