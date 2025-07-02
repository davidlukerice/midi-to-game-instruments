

const { ipcRenderer, contextBridge } = require('electron')

const channels = {
  GET_CONFIG: 'config_get',
  SET_CONFIG: 'config_set',

  SEND_KEY_TAP: 'send_key_tap',
  SEND_KEY_ON: 'send_key_on',
  SEND_KEY_OFF: 'send_key_off',
  SEND_SET_KEY_DELAY: 'send_set_key_delay',
}

contextBridge.exposeInMainWorld('midiToGameInstruments', {
  getConfig: () => ipcRenderer.invoke(channels.GET_CONFIG),
  setConfig: (key, value) => ipcRenderer.send(channels.SET_CONFIG, key, value),
  sendSetKeyDelay: (delay) => ipcRenderer.send(channels.SEND_SET_KEY_DELAY, delay),
  sendKey: (evt) => ipcRenderer.send(channels.SEND_KEY_TAP, evt),
})
