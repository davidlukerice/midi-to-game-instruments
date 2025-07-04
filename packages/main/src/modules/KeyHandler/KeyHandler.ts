import { AppModule } from '../../AppModule.js'

import { app, Menu, ipcMain } from 'electron'

import ElectronStore from 'electron-store'
import robot from '@hurdlegroup/robotjs'

import { channels } from './constants.js'
import { generateMenuTemplate } from './menuTemplate.js'
import { keyMaps } from './defaultKeyMaps/index.js'

robot.setKeyboardDelay(0)

const store = new ElectronStore({
  schema: {
    selectedInputName: {
      type: 'string',
      default: ''
    },
    selectedKeyMapIndex: {
      type: 'number',
      default: 0
    },
    sendNotes: {
      type: 'boolean',
      default: true
    },
    autoSwapOctave: {
      type: 'boolean',
      default: true
    },
    multipleOctaveShiftDelay: {
      type: 'number',
      default: 75
    },
    keyMaps: {
      type: 'array',
      default: keyMaps
    }
  }
})

ipcMain.handle(channels.GET_CONFIG, () => {
  return {
    appName: app.getName(),
    appVersion: app.getVersion(),
    config: store.store
  }
})

ipcMain.on(channels.SET_CONFIG, (event, key, value) => {
  store.set(key, value)
})

ipcMain.on(channels.SEND_SET_KEY_DELAY, async (event, eventData) => {
  const delay = eventData
  console.log(`on: SEND_SET_KEY_DELAY event ${delay}`)
  robot.setKeyboardDelay(delay)
})

ipcMain.on(channels.SEND_KEY_TAP, async (event, eventData) => {
  const { key } = eventData
  console.log(`on: SEND_KEY_TAP event ${key}`)
  try {
    robot.keyTap(key)
  } catch (e) {
    console.log('on: SEND_KEY_ON error', e)
  }
})

ipcMain.on(channels.SEND_KEY_ON, async (event, eventData) => {
  const { key } = eventData
  // const { key, eventTime } = eventData;

  // const sendStartTime = Date.now();
  // const timeToMainThread = Math.max(0, eventTime - sendStartTime);
  // console.log(`SEND_KEY_ON event ${key} start:${sendStartTime}`);
  // console.log(`SEND_KEY_ON event ${key} react->node:${timeToMainThread}ms`);

  try {
    robot.keyToggle(key, 'down')
  } catch (e) {
    console.log('on: SEND_KEY_ON error', e)
  }

  // const doneTime = Date.now();
  // const timeToOS = Math.max(0, doneTime - sendStartTime);
  // console.log(`SEND_KEY_ON event ${key} node<->OS:${timeToOS}ms`);
})

ipcMain.on(channels.SEND_KEY_OFF, async (event, eventData) => {
  const { key } = eventData
  try {
    robot.keyToggle(key, 'up')
  } catch (e) {
    console.log('on: SEND_KEY_OFF error', e)
  }
})

class KeyHandler implements AppModule {
  enable(): void {
    const menuTemplate = generateMenuTemplate(store)
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
  }
}

export function startupKeyHandler(
  ...args: ConstructorParameters<typeof KeyHandler>
) {
  return new KeyHandler(...args)
}
