import { WebMidi, type Input, type Output } from 'webmidi'
import {
  createContext,
  useEffect,
  useState,
  useContext,
  type ReactNode
} from 'react'
import { useConfig } from './useConfig'

type MIDIState = {
  isLoading: boolean
  error: unknown
  message: string
  inputs: Input[]
  outputs: Output[]
  selectedInput: Input | null
  selectInputByName: (name: string) => void
}

const defaultState: MIDIState = {
  isLoading: true,
  error: null,
  message: '',
  inputs: [],
  outputs: [],
  selectedInput: null,
  selectInputByName: () => {}
}

const MIDIContext = createContext(defaultState)

// eslint-disable-next-line react-refresh/only-export-components
export { MidiContextProvider, useMIDI }

function MidiContextProvider(props: { children: ReactNode }) {
  const { children } = props

  const config = useConfig()
  const [state, setState] = useState({
    ...defaultState,
    selectInputByName
  })

  useEffect(() => {
    if (config.isLoading) {
      return
    }

    WebMidi.enable({
      callback: (err: unknown) => {
        if (err) {
          setState((curr) => ({
            ...curr,
            isLoading: false,
            error: err
          }))
        } else {
          const input =
            WebMidi.getInputByName(config.config.selectedInputName) ||
            WebMidi.getInputByName(WebMidi.inputs[0]?.name) ||
            null

          setState((curr) => ({
            ...curr,
            isLoading: false,
            message: 'midi enabled',
            inputs: WebMidi.inputs,
            outputs: WebMidi.outputs,
            selectedInput: input
          }))
        }
      }
    })
  }, [config])

  return <MIDIContext.Provider value={state}> {children} </MIDIContext.Provider>

  function selectInputByName(inputName: string) {
    config.setValue('selectedInputName', inputName)
    const input = WebMidi.getInputByName(inputName)

    setState((curr) => ({
      ...curr,
      selectedInput: input ?? null
    }))
  }
}

function useMIDI() {
  const context = useContext(MIDIContext)
  if (!context) {
    throw new Error('useMIDI must be used within a MIDIContext')
  }
  return context
}
