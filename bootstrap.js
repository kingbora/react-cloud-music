const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const url = require("url");

const isProd = !process.argv.includes("--debug");

let mainWindow = null;
let currentSize = [1024, 650];

function createWindow() {
    mainWindow = new BrowserWindow({
        title: "网易云音悦",
        minWidth: currentSize[0],
        minHeight: currentSize[1],
        width: currentSize[0],
        height: currentSize[1],
        show: false,
        center: true,
        autoHideMenuBar: true,
        backgroundColor: '#fff',
        frame: false,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true
        }
    });

    const formatUrl = isProd ? url.format({
        pathname: path.join(__dirname, "www/index.html"),
        protocol: 'file:',
        slashes: true
    }) : "http://localhost:3000";

    mainWindow.loadURL(formatUrl);

    mainWindow.webContents.on("did-finish-load", () => {
        try {
            mainWindow.show();
            mainWindow.focus();
        } catch(ex) {}
    });

    mainWindow.on("closed", (e) => {
        if (force) {
            mainWindow = null;
            app.quit();
        } else {
            e.preventDefault();
            mainWindow.hide();
        }
    });

    if (!isProd) {
        //打开调试工具
        globalShortcut.register("CmdOrCtrl+Shift+I", () => {
            if (mainWindow.isFocused()) {
                mainWindow.webContents.toggleDevTools();
            }
        });

        //重新加载
        globalShortcut.register("CmdOrCtrl+Shift+R", () => {
            if (mainWindow.isFocused()) {
                mainWindow.loadURL(formatUrl);
            }
        });
    }
}

// 禁止开启多个应用
if (!app.requestSingleInstanceLock()) {
    app.quit();
}
app.on('second-instance', () => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.show();
    }
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

let force = true;

// 退出
ipcMain.once("exitApp", () => {
    app.quit();
});
// 最小化
ipcMain.on("minimizeApp", () => {
    if (!mainWindow.isMinimized()) {
        mainWindow.minimize();
    }
});
// 最大化
ipcMain.on("maximizeApp", (event) => {
    if (!mainWindow.isMaximized()) {
        mainWindow.maximize();
        event.sender.send("isAppMax", true);
    } else {
        mainWindow.unmaximize();
        event.sender.send("isAppMax", false);
    }
});