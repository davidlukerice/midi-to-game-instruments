const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const ks = require('node-key-sender');
const Store = require('electron-store');

const { channels } = require('../src/shared/constants');

ks.setOption('startDelayMillisec', 0);
ks.setOption('globalDelayPressMillisec ', 0);
ks.setOption('globalDelayBetweenMillisec ', 0);

const store = new Store({
  schema: {
    selectedInputName: {
      type: 'string',
      default: '',
    },
  },
});
let mainWindow;

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle(channels.GET_CONFIG, () => {
  return {
    appName: app.getName(),
    appVersion: app.getVersion(),
    config: store.store,
  };
});

ipcMain.on(channels.SET_CONFIG, (event, key, value) => {
  store.set(key, value);
});

ipcMain.on(channels.SEND_KEY, async (event, eventData) => {
  const { key, eventTime } = eventData;

  const sendStartTime = Date.now();
  const timeToMainThread = Math.max(0, eventTime - sendStartTime);
  console.log(`SEND_KEY event react->node:${timeToMainThread}ms`);

  try {
    await ks.sendKey(key);
  } catch (e) {
    console.log('SEND_KEY error', e);
  }

  const doneTime = Date.now();
  const timeToOS = Math.max(0, doneTime - sendStartTime);
  console.log(`SEND_KEY event node<->OS:${timeToOS}ms`);
});

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true,
    });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
