import React, { useEffect, useContext, useState, useRef } from 'react';
import { channels } from '../../shared/constants';
import { useMIDI } from '../hooks/useMIDI';

const { ipcRenderer } = window;

const keySenderContext = React.createContext();

export { KeySenderProvider, useKeySender };

// gw2 harp keymap
const keyMap = {
  notes: {
    C3: { key: '1', octave: 0 },
    D3: { key: '2', octave: 0 },
    E3: { key: '3', octave: 0 },
    F3: { key: '4', octave: 0 },
    G3: { key: '5', octave: 0 },
    A3: { key: '6', octave: 0 },
    B3: { key: '7', octave: 0 },
    // TODO: how to handle overlaps?
    // C4: { key: '8', octave: 0 },

    C4: { key: '1', octave: 1 },
    D4: { key: '2', octave: 1 },
    E4: { key: '3', octave: 1 },
    F4: { key: '4', octave: 1 },
    G4: { key: '5', octave: 1 },
    A4: { key: '6', octave: 1 },
    B4: { key: '7', octave: 1 },
    C5: { key: '8', octave: 1 },

    // TODO: how to handle overlaps?
    // C5: { key: '1', octave: 2 },
    D5: { key: '2', octave: 2 },
    E5: { key: '3', octave: 2 },
    F5: { key: '4', octave: 2 },
    G5: { key: '5', octave: 2 },
    A5: { key: '6', octave: 2 },
    B5: { key: '7', octave: 2 },
    C6: { key: '8', octave: 2 },

    // TODO: How to handle allowing octave key switch
    // when not in auto octave mode
    // D5: { key: '9' },
    // E5: { key: '0' },
  },
  octaveDown: { key: '9' },
  octaveUp: { key: '0' },
};

//

function KeySenderProvider(props) {
  const { children } = props;

  const internalState = useRef({
    octave: 1,
  });

  const [state, setState] = useState({
    sentMessages: [],
    octave: 1,
  });

  const { selectedInput } = useMIDI();

  useEffect(() => {
    if (!selectedInput) {
      return;
    }

    const noteOnHandler = (e) => {
      const mapKey = `${e.note.name}${e.note.octave}`;
      const note = keyMap.notes[mapKey];
      const keyTime = Date.now();

      if (!note?.key) {
        return;
      }

      const noteOctave = note.octave;
      // TODO: Only when in auto octave mode
      let octaveShifts = 0;
      while (internalState.current.octave < noteOctave) {
        _addMessage(
          `shift up octave ${internalState.current.octave} towards ${noteOctave}`
        );
        const upKey = keyMap.octaveUp.key;
        // TODO: Can probably add a 'SEND_TAP_KEY' event?
        // may fix trying to jump multiple octaves
        _sendKey(channels.SEND_KEY_ON, upKey, keyTime);
        _sendKey(channels.SEND_KEY_OFF, upKey, keyTime);
        internalState.current.octave += 1;

        octaveShifts += 1;
        if (octaveShifts > 10) {
          throw new Error('Too many octave shifts...');
        }
      }
      while (internalState.current.octave > noteOctave) {
        _addMessage(
          `shift down octave ${internalState.current.octave} towards ${noteOctave}`
        );
        const downKey = keyMap.octaveDown.key;
        _sendKey(channels.SEND_KEY_ON, downKey, keyTime);
        _sendKey(channels.SEND_KEY_OFF, downKey, keyTime);
        internalState.current.octave -= 1;

        octaveShifts += 1;
        if (octaveShifts > 10) {
          throw new Error('Too many octave shifts...');
        }
      }

      setState((curr) => ({
        ...curr,
        octave: internalState.current.octave,
      }));

      _addMessage(`noteOn ${mapKey} -> '${note?.key}' : ${note?.octave}`);
      _sendKey(channels.SEND_KEY_ON, note.key, keyTime);
    };

    const noteOffHandler = (e) => {
      const mapKey = `${e.note.name}${e.note.octave}`;
      const note = keyMap.notes[mapKey];
      const keyTime = Date.now();

      if (!note?.key) {
        return;
      }

      // _addMessage(`noteOff ${mapKey} -> '${note?.key}'`);
      _sendKey(channels.SEND_KEY_OFF, note.key, keyTime);
    };

    function _sendKey(event, key, time) {
      ipcRenderer.send(event, {
        key: key,
        eventTime: time,
      });
    }

    selectedInput.addListener('noteon', 'all', noteOnHandler);
    selectedInput.addListener('noteoff', 'all', noteOffHandler);

    return () => {
      if (!selectedInput) {
        return;
      }
      selectedInput.removeListener('noteon', 'all', noteOnHandler);
      selectedInput.removeListener('noteoff', 'all', noteOffHandler);
    };
  }, [selectedInput]);

  return (
    <keySenderContext.Provider value={state}>
      {children}
    </keySenderContext.Provider>
  );

  function _addMessage(message) {
    setState((curr) => ({
      sentMessages: [message, ...curr.sentMessages].slice(0, 10),
    }));
  }
}

function useKeySender() {
  const context = useContext(keySenderContext);
  if (!context) {
    throw new Error('useKeySender must be used within a keySenderContext');
  }
  return context;
}
