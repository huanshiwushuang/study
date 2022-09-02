const GlobalKeyboardListener =
    require("node-global-key-listener").GlobalKeyboardListener;
const robotjs = require("robotjs");

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

v.addListener((e, down) => {
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
                let stamp = Date.now().toString(36);
                for (let i = 0; i < 4; i++) {
                    robotjs.keyTap("backspace");
                }
                robotjs.typeString(stamp);
            }
            break;
    }
});
