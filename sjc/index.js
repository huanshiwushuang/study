const GlobalKeyboardListener =
	require("node-global-key-listener").GlobalKeyboardListener;
const hmcAutoit = require("hmc-autoit");

const v = new GlobalKeyboardListener({
	windows: {
		onError: (errorCode) => console.error("ERROR: " + errorCode),
		onInfo: (info) => console.info("INFO: " + info),
	},
	mac: {
		onError: (errorCode) => console.error("ERROR: " + errorCode),
	},
});

let pressQueue = [];

v.addListener(async (e, down) => {
	switch (e.state.toLowerCase()) {
		case "down":
			// 记录按下的键，限制总长度
			if (e.name) {
				pressQueue.push(e.name.toLowerCase());
				pressQueue = pressQueue.slice(-10);
			}
			break;
	}

	switch (pressQueue.slice(-4).join()) {
		case "s,j,c,space":
			{
				const stamp = Date.now().toString(36);
				for (let i = 0; i < 4; i++) {
					hmcAutoit.Send("{BACKSPACE}");
				}
				hmcAutoit.Send(stamp);
			}
			break;
		// 全选当前-复制当前-替换所有的 自动生成的时间戳id
		case "s,j,c,a,space":
			{
				// const stamp = Date.now().toString(36);
				// for (let i = 0; i < 5; i++) {
				//     await kb.pressKey(Key.Backspace);
				// }
				// kb.type(stamp);
			}
			break;
	}
});
