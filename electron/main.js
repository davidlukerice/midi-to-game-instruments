const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const Store = require('electron-store');
const robot = require('robotjs');

const { channels } = require('../src/shared/constants');
const { generateMenuTemplate } = require('./menuTemplate');
const { keyMaps } = require('./defaultKeyMaps');

robot.setKeyboardDelay(0);

const store = new Store({
  schema: {
    selectedInputName: {
      type: 'string',
      default: '',
    },
    selectedKeyMap: {
      type: 'number',
      default: 0,
    },
    sendNotes: {
      type: 'boolean',
      default: true,
    },
    autoSwapOctave: {
      type: 'boolean',
      default: true,
    },
    keyMaps: {
      type: 'array',
      default: keyMaps,
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

ipcMain.on(channels.SEND_SET_KEY_DELAY, async (event, eventData) => {
  const { delay } = eventData;
  console.log(`SEND_SET_KEY_DELAY event ${delay}`);
  robot.setKeyboardDelay(delay);
});

ipcMain.on(channels.SEND_KEY_TAP, async (event, eventData) => {
  const { key } = eventData;
  console.log(`SEND_KEY_TAP event ${key}`);
  try {
    robot.keyTap(key);
  } catch (e) {
    console.log('SEND_KEY_ON error', e);
  }
});

ipcMain.on(channels.SEND_KEY_ON, async (event, eventData) => {
  const { key } = eventData;
  // const { key, eventTime } = eventData;

  // const sendStartTime = Date.now();
  // const timeToMainThread = Math.max(0, eventTime - sendStartTime);
  // console.log(`SEND_KEY_ON event ${key} start:${sendStartTime}`);
  // console.log(`SEND_KEY_ON event ${key} react->node:${timeToMainThread}ms`);

  try {
    robot.keyToggle(key, 'down');
  } catch (e) {
    console.log('SEND_KEY_ON error', e);
  }

  // const doneTime = Date.now();
  // const timeToOS = Math.max(0, doneTime - sendStartTime);
  // console.log(`SEND_KEY_ON event ${key} node<->OS:${timeToOS}ms`);
});

ipcMain.on(channels.SEND_KEY_OFF, async (event, eventData) => {
  const { key } = eventData;
  try {
    robot.keyToggle(key, 'up');
  } catch (e) {
    console.log('SEND_KEY_OFF error', e);
  }
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

  const menuTemplate = generateMenuTemplate({ store });
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}
