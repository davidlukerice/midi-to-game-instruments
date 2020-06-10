import React, { useEffect, useState, useRef } from 'react';
import { useMIDI } from '../hooks/useMIDI';

export default MIDIDisplay;

function MIDIDisplay(props) {
  const { selectedInput } = useMIDI();
  const oldSelectedRef = useRef(null);
  const [midiMessages, setMidiMessages] = useState([]);

  useEffect(() => {
    console.log(
      '**** adding eventListener to',
      selectedInput ? selectedInput.name : 'none'
    );

    if (oldSelectedRef.current) {
      oldSelectedRef.current.removeListener('noteon');
    }

    if (!selectedInput) {
      return;
    }

    selectedInput.addListener('noteon', 'all', function (e) {
      console.log('noteon: ' + e.value);
      setMidiMessages((curr) => [`noteon: ${e.value}`, ...curr].slice(0, 10));
    });

    selectedInput.current = selectedInput;
  }, [selectedInput]);

  return (
    <div>
      {midiMessages.map((message, i) => (
        <div key={i}>{message}</div>
      ))}
    </div>
  );
}
