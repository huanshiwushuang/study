const GlobalKeyboardListener =
    require("node-global-key-listener").GlobalKeyboardListener;
const { KeyboardClass, Key, providerRegistry } = require("@nut-tree/nut-js");

const kb = new KeyboardClass(providerRegistry);
kb.config.autoDelayMs = 0;

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
                    await kb.pressKey(Key.Backspace);
                }
                kb.type(stamp);
            }
            break;
    }
});
