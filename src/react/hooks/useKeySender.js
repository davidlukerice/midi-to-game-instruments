import React, { useEffect, useContext, useState } from 'react';
import { channels } from '../../shared/constants';
import { useMIDI } from '../hooks/useMIDI';

const { ipcRenderer } = window;

const keySenderContext = React.createContext();

export { KeySenderProvider, useKeySender };

// gw2 harp keymap
const keyMap = {
  notes: {
    C4: { key: '1', octave: 2 },
    D4: { key: '2', octave: 2 },
    E4: { key: '3', octave: 2 },
    F4: { key: '4', octave: 2 },
    G4: { key: '5', octave: 2 },
    A4: { key: '6', octave: 2 },
    B4: { key: '7', octave: 2 },
    C5: { key: '8', octave: 2 },
  },
  special: {
    octaveUp: { key: '9' },
    octaveDown: { key: '0' },
  },
};

function KeySenderProvider(props) {
  const { children } = props;
  const [state, setState] = useState({
    sentMessages: [],
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

      _addMessage(`noteOn ${mapKey} -> '${note?.key}'`);
      ipcRenderer.send(channels.SEND_KEY_ON, {
        key: note.key,
        eventTime: keyTime,
      });
    };

    const noteOffHandler = (e) => {
      const mapKey = `${e.note.name}${e.note.octave}`;
      const note = keyMap.notes[mapKey];
      const keyTime = Date.now();

      if (!note?.key) {
        return;
      }

      // _addMessage(`noteOff ${mapKey} -> '${note?.key}'`);
      ipcRenderer.send(channels.SEND_KEY_OFF, {
        key: note.key,
        eventTime: keyTime,
      });
    };

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
