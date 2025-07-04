import { ipcRenderer } from 'electron'

export { versions } from 'node:process'

const channels = {
  GET_CONFIG: 'config_get',
  SET_CONFIG: 'config_set',

  SEND_KEY_TAP: 'send_key_tap',
  SEND_KEY_ON: 'send_key_on',
  SEND_KEY_OFF: 'send_key_off',
  SEND_SET_KEY_DELAY: 'send_set_key_delay'
}

type ConfigValue = unknown
type KeyTapEvent = {
  key: string
  time?: number
}

const midiToGameInstruments = {
  getConfig: () => ipcRenderer.invoke(channels.GET_CONFIG),
  setConfig: (key: string, value: ConfigValue) =>
    ipcRenderer.send(channels.SET_CONFIG, key, value),
  sendSetKeyDelay: ({ delay }: { delay: number }) =>
    ipcRenderer.send(channels.SEND_SET_KEY_DELAY, delay),
  sendKey: (evt: KeyTapEvent) => ipcRenderer.send(channels.SEND_KEY_TAP, evt)
}

export { midiToGameInstruments }
