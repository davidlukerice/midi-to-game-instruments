import React, { useEffect, useState } from 'react';
import { useMIDI } from '../hooks/useMIDI';

export default MIDIDisplay;

function MIDIDisplay(props) {
  const { selectedInput } = useMIDI();
  const [midiMessages, setMidiMessages] = useState([]);

  useEffect(() => {
    if (!selectedInput) {
      return;
    }

    const handler = (e) => {
      const message = `noteon: ${e.note.name} ${e.note.octave}`;
      setMidiMessages((curr) => [message, ...curr].slice(0, 10));
    };

    selectedInput.addListener('noteon', 'all', handler);

    return () => {
      if (!selectedInput) {
        return;
      }

      selectedInput.removeListener('noteon', 'all', handler);
    };
  }, [selectedInput]);

  return (
    <div>
      {midiMessages.map((message, i) => (
        <div key={i}>{message}</div>
      ))}
      <br />
      Input used for testing key press <input />
    </div>
  );
}
