import { app, shell, MenuItemConstructorOptions, MenuItem } from 'electron'
import ElectronStore from 'electron-store'

const isMac = process.platform === 'darwin'

export { generateMenuTemplate }

type MenuTemplateItem = MenuItemConstructorOptions | MenuItem

type ConfigStore = ElectronStore<{
  selectedInputName: unknown
  selectedKeyMapIndex: unknown
  sendNotes: unknown
  autoSwapOctave: unknown
  multipleOctaveShiftDelay: unknown
  keyMaps: unknown
}>

function generateMenuTemplate(store: ConfigStore): MenuTemplateItem[] {
  const iconItem: MenuTemplateItem = {
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }

  const fileItem: MenuTemplateItem = {
    label: 'File',
    submenu: [
      {
        label: 'edit config',
        click: () => {
          store.openInEditor()
        }
      },
      {
        label: 'open config folder',
        click: () => {
          shell.showItemInFolder(store.path)
        }
      },
      {
        label: 'clear config (requires restart)',
        click: () => {
          store.clear()
        }
      },
      { role: isMac ? 'close' : 'quit' }
    ]
  }

  const macEditItems: MenuItemConstructorOptions[] = [
    { role: 'pasteAndMatchStyle' },
    { role: 'delete' },
    { role: 'selectAll' },
    { type: 'separator' }
  ]
  const windowsEditItems: MenuItemConstructorOptions[] = [
    { role: 'delete' },
    { type: 'separator' },
    { role: 'selectAll' }
  ]
  const editItem: MenuTemplateItem = {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? macEditItems : windowsEditItems)
    ]
  }

  const viewItem: MenuTemplateItem = {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  } as MenuTemplateItem

  const windowItem: MenuTemplateItem = {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ]
        : [{ role: 'close' }])
    ]
  } as MenuTemplateItem

  const helpItem: MenuTemplateItem = {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          await shell.openExternal(
            'https://github.com/davidlukerice/midi-to-game-instruments'
          )
        }
      }
    ]
  }

  return isMac
    ? [iconItem, fileItem, editItem, viewItem, windowItem, helpItem]
    : [fileItem, editItem, viewItem, windowItem, helpItem]
}
