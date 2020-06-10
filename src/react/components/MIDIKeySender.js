import React, { useEffect } from 'react';
import { channels } from '../../shared/constants';
import { useMIDI } from '../hooks/useMIDI';

const { ipcRenderer } = window;

export default MIDIKeySender;

const keyMap = {
  C4: '1',
  D4: '2',
  E4: '3',
  F4: '4',
  G4: '5',
  A4: '6',
  B4: '7',
  C5: '8',
  D5: '9',
  E5: '0',
};

function MIDIKeySender(props) {
  // TODO: Probably just move sending logic up into the MIDI Context

  const { selectedInput } = useMIDI();

  useEffect(() => {
    if (!selectedInput) {
      return;
    }

    const handler = (e) => {
      const mapKey = `${e.note.name}${e.note.octave}`;
      const key = keyMap[mapKey];
      console.log(`${mapKey} -> '${key}'`);

      if (!key) {
        return;
      }
      ipcRenderer.send(channels.SEND_KEY, { key });
    };

    selectedInput.addListener('noteon', 'all', handler);

    return () => {
      if (!selectedInput) {
        return;
      }
      selectedInput.removeListener('noteon', 'all', handler);
    };
  }, [selectedInput]);

  return <div>[sender]</div>;
}
