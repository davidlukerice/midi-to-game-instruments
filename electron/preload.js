

import { ipcRenderer, contextBridge } from 'electron';
import { channels } from '../src/shared/constants';


contextBridge.exposeInMainWorld('myApi', {
  getConfig: () => ipcRenderer.invoke(channels.GET_CONFIG),
  setConfig: (key, value) => ipcRenderer.send(channels.SET_CONFIG, key, value),
  sendSetKeyDelay: (delay) => ipcRenderer.send(channels.SEND_SET_KEY_DELAY, delay),
  sendKey: (key, value) => ipcRenderer.send(channels.SEND_KEY_TAP, key, value),
})

