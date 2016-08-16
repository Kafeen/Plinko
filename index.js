const path = require('path');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed', () => {
    app.quit();
});

app.on('ready', () => {
    // http://electron.atom.io/docs/latest/api/browser-window/#new-browserwindow-options
    mainWindow = new BrowserWindow({
        name: 'Plinko',
        width: 1280,
        height: 720,
        toolbar: false,
        resizable: false,
        fullscreen: false
    });

    mainWindow.loadURL(path.join('file://', __dirname, '/app/index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
