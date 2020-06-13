import React, { useEffect, useContext, useState, useRef } from 'react';
import { channels } from '../../shared/constants';
import { useMIDI } from '../hooks/useMIDI';
import { useConfig } from '../hooks/useConfig';

const { ipcRenderer } = window;

const keySenderContext = React.createContext();

export { KeySenderProvider, useKeySender };

// If this is too low, the game may not recognize multiple octave shifts
// If too high, it adds unnecessary delay
// TODO: Move to config since the sweet spot may be different per game/person?
const MULTIPLE_OCTAVE_SHIFT_DELAY = 75;

const MESSAGE_LIMIT = 100;

function KeySenderProvider(props) {
  const { children } = props;
  const { isLoading: configIsLoading, config } = useConfig();

  const internalState = useRef({
    octave: 1,
  });

  const [state, setState] = useState({
    sentMessages: [],
    octave: 1,
  });

  const { selectedInput } = useMIDI();

  useEffect(() => {
    if (configIsLoading) {
      return;
    }

    const { sendNotes, autoSwapOctave, keyMaps } = config;

    if (!selectedInput || !sendNotes) {
      return;
    }

    const keyMap = keyMaps[0];

    // TODO: Allow toggle between note on/off and tap?
    selectedInput.addListener('noteon', 'all', _noteOnHandler);
    //selectedInput.addListener('noteoff', 'all', noteOffHandler);

    return () => {
      if (!selectedInput) {
        return;
      }
      selectedInput.removeListener('noteon', 'all', _noteOnHandler);
      //selectedInput.removeListener('noteoff', 'all', noteOffHandler);
    };

    function _noteOnHandler(e) {
      const mapKey = `${e.note.name}${e.note.octave}`;
      const note = keyMap.notes[mapKey];
      const keyTime = Date.now();

      if (!note?.key) {
        _addMessage(`noteOn ${mapKey} -> 'None'`);
        return;
      }

      const { useAltOctaveKey } = autoSwapOctave
        ? _handleOctaveShift({ note })
        : { shiftedOctaves: false, useAltOctaveKey: false };

      const keyToSend = useAltOctaveKey ? note.altOctaveKey : note.key;

      setState((curr) => ({
        ...curr,
        octave: internalState.current.octave,
      }));

      _addMessage(`noteOn ${mapKey} -> '${keyToSend}' : ${note?.octave}`);
      _sendKey(channels.SEND_KEY_TAP, keyToSend, keyTime);
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
     * @return { shiftedOctaves, useAltOctaveKey }
     */
    function _handleOctaveShift({ note }) {
      if (!note.hasOwnProperty('octave')) {
        return { shiftedOctaves: false, useAltOctaveKey: false };
      }

      const noteOctave = note.octave;

      if (noteOctave === internalState.current.octave) {
        return { shiftedOctaves: false, useAltOctaveKey: false };
      }
      if (
        note.hasOwnProperty('altOctave') &&
        note.altOctave === internalState.current.octave
      ) {
        return { shiftedOctaves: false, useAltOctaveKey: true };
      }

      let delayAdded = false;

      // TODO: May be able to shift less octaves if using an alt octave key?

      let octaveShifts = 0;
      while (internalState.current.octave < noteOctave) {
        if (noteOctave - internalState.current.octave > 1) {
          delayAdded = true;
          ipcRenderer.send(channels.SEND_SET_KEY_DELAY, {
            delay: MULTIPLE_OCTAVE_SHIFT_DELAY,
          });
        } else if (delayAdded) {
          delayAdded = false;
          ipcRenderer.send(channels.SEND_SET_KEY_DELAY, { delay: 0 });
        }
        _addMessage(
          `shift up octave ${internalState.current.octave} towards ${noteOctave}`
        );
        const upKey = keyMap.octaveUp.key;
        // TODO: add delays to fix multiple octave jumps?
        _sendKey(channels.SEND_KEY_TAP, upKey);
        internalState.current.octave += 1;

        octaveShifts += 1;
        if (octaveShifts > 10) {
          throw new Error('Too many octave shifts...');
        }
      }
      while (internalState.current.octave > noteOctave) {
        if (internalState.current.octave - noteOctave > 1) {
          ipcRenderer.send(channels.SEND_SET_KEY_DELAY, {
            delay: MULTIPLE_OCTAVE_SHIFT_DELAY,
          });
          delayAdded = true;
        } else if (delayAdded) {
          delayAdded = false;
          ipcRenderer.send(channels.SEND_SET_KEY_DELAY, { delay: 0 });
        }

        _addMessage(
          `shift down octave ${internalState.current.octave} towards ${noteOctave}`
        );
        const downKey = keyMap.octaveDown.key;
        _sendKey(channels.SEND_KEY_TAP, downKey);
        internalState.current.octave -= 1;

        octaveShifts += 1;
        if (octaveShifts > 10) {
          throw new Error('Too many octave shifts...');
        }
      }

      if (delayAdded) {
        ipcRenderer.send(channels.SEND_SET_KEY_DELAY, { delay: 0 });
      }

      return { shiftedOctaves: true, useAltOctaveKey: false };
    }
  }, [configIsLoading, selectedInput, config]);

  return (
    <keySenderContext.Provider value={state}>
      {children}
    </keySenderContext.Provider>
  );

  function _addMessage(message) {
    setState((curr) => ({
      ...curr,
      sentMessages: [...curr.sentMessages, message].slice(
        curr.sentMessages.length - MESSAGE_LIMIT,
        MESSAGE_LIMIT
      ),
    }));
  }

  function _sendKey(event, key, time) {
    ipcRenderer.send(event, {
      key: key,
      eventTime: time,
    });
  }
}

function useKeySender() {
  const context = useContext(keySenderContext);
  if (!context) {
    throw new Error('useKeySender must be used within a keySenderContext');
  }
  return context;
}
