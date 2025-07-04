import {
  createContext,
  useEffect,
  useState,
  useContext,
  type ReactNode
} from 'react'
import { set, cloneDeep } from 'lodash'
import { midiToGameInstruments } from '@app/preload'

// TODO: Get config types from backend ElectronStore schema
export type NoteDefinition = {
  key?: string
  octave?: number
  altOctave?: number
  altOctaveKey?: string
  forceInternalOctave?: number
}

export type KeyMap = {
  name: string
  autoOctaveSwap: boolean
  notes: Record<string, NoteDefinition>
  octaveDown?: { key: string }
  octaveUp?: { key: string }
}

type Config = {
  selectedInputName: string
  selectedKeyMapIndex: number
  sendNotes: boolean
  autoSwapOctave: boolean
  multipleOctaveShiftDelay: number
  keyMaps: KeyMap[]
}

type configValue = unknown

type ConfigState = {
  isLoading: boolean
  appName: string
  appVersion: string
  config: Config
  setValue: (_key: string, _value: configValue) => void
}

const defaultConfig: Config = {
  selectedInputName: '',
  selectedKeyMapIndex: 0,
  sendNotes: false,
  autoSwapOctave: false,
  multipleOctaveShiftDelay: 0,
  keyMaps: []
}

const defaultState: ConfigState = {
  isLoading: true,
  appName: '',
  appVersion: '',
  config: defaultConfig,
  setValue: () => {}
}

const configContext = createContext(defaultState)

// eslint-disable-next-line react-refresh/only-export-components
export { ConfigContextProvider, useConfig }

function ConfigContextProvider(props: { children: ReactNode }) {
  const { children } = props

  const [state, setState] = useState({ ...defaultState, setValue })

  useEffect(() => {
    ;(async () => {
      const response = await midiToGameInstruments.getConfig()

      console.log('Config loaded', response.config)

      setState((curr) => ({
        ...curr,
        isLoading: false,
        appName: response.appName,
        appVersion: response.appVersion,
        config: response.config
      }))
    })()
  }, [])

  return (
    <configContext.Provider value={state}> {children} </configContext.Provider>
  )

  function setValue(key: string, value: configValue) {
    setState((curr) => {
      const configCopy = cloneDeep(curr.config)
      const newConfig = set(configCopy, key, value)
      return {
        ...curr,
        config: newConfig
      }
    })
    midiToGameInstruments.setConfig(key, value)
  }
}

function useConfig() {
  const context = useContext(configContext)
  if (!context) {
    throw new Error('useConfig must be used within a configContext')
  }
  return context
}
