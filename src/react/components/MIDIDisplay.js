import React from 'react';
import { useKeySender } from '../hooks/useKeySender';

export default MIDIDisplay;

function MIDIDisplay(props) {
  const { sentMessages } = useKeySender();

  return (
    <div>
      <h3>Messages</h3>
      <div>
        {sentMessages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </div>
    </div>
  );
}
