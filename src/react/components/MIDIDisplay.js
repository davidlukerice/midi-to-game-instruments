import React from 'react';
import { useKeySender } from '../hooks/useKeySender';

export default MIDIDisplay;

function MIDIDisplay(props) {
  const { sentMessages, octave } = useKeySender();

  return (
    <div>
      <h3>Messages</h3>
      <div>Octave {octave}</div>
      <div>
        {sentMessages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </div>
    </div>
  );
}
