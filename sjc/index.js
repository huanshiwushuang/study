const GlobalKeyboardListener = require('node-global-key-listener').GlobalKeyboardListener;
const robotjs = require('robotjs');

const v = new GlobalKeyboardListener({
	windows: {
		onError: (errorCode) => console.error("ERROR: " + errorCode),
		onInfo: (info) => console.info("INFO: " + info)
	},
	mac: {
		onError: (errorCode) => console.error("ERROR: " + errorCode),
	}
});

let press_queue = [];

v.addListener((e, down) => {
	switch (e.state.toLowerCase()) {
		case 'down':
			// 记录按下的键，限制总长度
			press_queue.push(e.name.toLowerCase());
			press_queue = press_queue.slice(-10);
			break;
	}

	switch (press_queue.slice(-4).join()) {
		case 's,j,c,space':
			{
				let stamp = Date.now().toString(36)
				for (let i = 0; i < 4; i++) {
					robotjs.keyTap('backspace');
				}
				robotjs.typeString(stamp);
			}
			break;
	}
})


