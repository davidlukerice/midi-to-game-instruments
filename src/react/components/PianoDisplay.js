import React from 'react';
import { useKeySender } from '../hooks/useKeySender';

export default PianoDisplay;

function PianoDisplay(props) {
  const { octave } = useKeySender();
  return <div>Octave {octave}</div>;
}
