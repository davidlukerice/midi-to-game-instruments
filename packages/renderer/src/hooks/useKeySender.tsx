import {
  createContext,
  useEffect,
  useContext,
  useState,
  useRef,
  type ReactNode
} from 'react'
import { midiToGameInstruments } from '@app/preload'

import { useMIDI } from '../hooks/useMIDI'
import { useConfig } from '../hooks/useConfig'
import type { NoteMessageEvent } from 'webmidi'
import type { NoteDefinition } from '../../../main/src/modules/KeyHandler/types'

type KeySenderState = {
  sentMessages: string[]
  octave: number
}

const defaultState: KeySenderState = {
  sentMessages: [],
  octave: 1
}

const keySenderContext = createContext(defaultState)

// eslint-disable-next-line react-refresh/only-export-components
export { KeySenderProvider, useKeySender }

const MESSAGE_LIMIT = 100

function KeySenderProvider(props: { children: ReactNode }) {
  const { children } = props
  const { isLoading: configIsLoading, config } = useConfig()

  const internalState = useRef({ octave: 1 })

  const [state, setState] = useState(defaultState)

  const { selectedInput } = useMIDI()

  useEffect(() => {
    if (configIsLoading) {
      return
    }

    const {
      sendNotes,
      autoSwapOctave,
      keyMaps,
      selectedKeyMapIndex,
      multipleOctaveShiftDelay
    } = config

    if (!selectedInput || !sendNotes) {
      return
    }

    const keyMap = keyMaps[selectedKeyMapIndex]

    // TODO: Allow toggle between note on/off and tap?
    selectedInput.addListener('noteon', _noteOnHandler)
    //selectedInput.addListener('noteoff', noteOffHandler);

    return () => {
      if (!selectedInput) {
        return
      }
      selectedInput.removeListener('noteon', _noteOnHandler)
      //selectedInput.removeListener('noteoff', noteOffHandler);
    }

    function _noteOnHandler(e: NoteMessageEvent) {
      const mapKey = `${e.note.name}${e.note.octave}`
      const note = keyMap.notes[mapKey]
      const keyTime = Date.now()

      if (!note?.key) {
        _addMessage(`noteOn ${mapKey} -> 'None'`)
        return
      }

      const { useAltOctaveKey } = autoSwapOctave
        ? _handleOctaveShift({ note })
        : { useAltOctaveKey: false }

      const keyToSend =
        useAltOctaveKey && note.altOctaveKey ? note.altOctaveKey : note.key

      setState((curr) => ({
        ...curr,
        octave: internalState.current.octave
      }))

      _addMessage(`noteOn ${mapKey} -> '${keyToSend}' : ${note?.octave}`)
      _sendKey(keyToSend, keyTime)
      // _sendKey(channels.SEND_KEY_ON, note.key, keyTime);
    }

    // function _noteOffHandler (e) {
    //   const mapKey = `${e.note.name}${e.note.octave}`;
    //   const note = keyMap.notes[mapKey];
    //   const keyTime = Date.now();

    //   if (!note?.key) {
    //     return;
    //   }

    //   // _addMessage(`noteOff ${mapKey} -> '${note?.key}'`);
    //   _sendKey(channels.SEND_KEY_OFF, note.key, keyTime);
    // };

    /**
     * Transitions from the current octave to the one on the next played note
     * @param options.note
     * @return { useAltOctaveKey }
     */
    function _handleOctaveShift({ note }: { note: NoteDefinition }) {
      if (!('octave' in note)) {
        return { useAltOctaveKey: false }
      }

      const noteOctave = note.octave ?? internalState.current.octave

      if (noteOctave === internalState.current.octave) {
        return { useAltOctaveKey: false }
      }
      if (
        'altOctave' in note &&
        note.altOctave === internalState.current.octave
      ) {
        return { useAltOctaveKey: true }
      }

      let delayAdded = false

      // TODO: May be able to shift less octaves if using an alt octave key?

      let octaveShifts = 0
      while (internalState.current.octave < noteOctave) {
        if (noteOctave - internalState.current.octave > 1) {
          delayAdded = true
          midiToGameInstruments.sendSetKeyDelay({
            delay: multipleOctaveShiftDelay
          })
        } else if (delayAdded) {
          delayAdded = false
          midiToGameInstruments.sendSetKeyDelay({ delay: 0 })
        }
        _addMessage(
          `shift up octave ${internalState.current.octave} towards ${noteOctave}`
        )
        const upKey = keyMap.octaveUp?.key
        // TODO: add delays to fix multiple octave jumps?
        if (upKey) {
          _sendKey(upKey)
        }
        internalState.current.octave += 1

        octaveShifts += 1
        if (octaveShifts > 10) {
          throw new Error('Too many octave shifts...')
        }
      }
      while (internalState.current.octave > noteOctave) {
        if (internalState.current.octave - noteOctave > 1) {
          midiToGameInstruments.sendSetKeyDelay({
            delay: multipleOctaveShiftDelay
          })
          delayAdded = true
        } else if (delayAdded) {
          delayAdded = false
          midiToGameInstruments.sendSetKeyDelay({ delay: 0 })
        }

        _addMessage(
          `shift down octave ${internalState.current.octave} towards ${noteOctave}`
        )
        const downKey = keyMap.octaveDown?.key
        if (downKey) {
          _sendKey(downKey)
        }
        internalState.current.octave -= 1

        octaveShifts += 1
        if (octaveShifts > 10) {
          throw new Error('Too many octave shifts...')
        }
      }

      if (delayAdded) {
        midiToGameInstruments.sendSetKeyDelay({ delay: 0 })
      }

      return { shiftedOctaves: true, useAltOctaveKey: false }
    }
  }, [configIsLoading, selectedInput, config])

  return (
    <keySenderContext.Provider value={state}>
      {children}
    </keySenderContext.Provider>
  )

  function _addMessage(message: string) {
    setState((curr) => ({
      ...curr,
      sentMessages: [...curr.sentMessages, message].slice(
        curr.sentMessages.length - MESSAGE_LIMIT,
        MESSAGE_LIMIT
      )
    }))
  }

  function _sendKey(key: string, time: number = 0) {
    midiToGameInstruments.sendKey({
      key: key,
      time: time
    })
  }
}

function useKeySender() {
  const context = useContext(keySenderContext)
  if (!context) {
    throw new Error('useKeySender must be used within a keySenderContext')
  }
  return context
}
