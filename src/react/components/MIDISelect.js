import React from 'react';
import { Select } from '@chakra-ui/core';

import { useMIDI } from '../hooks/useMIDI';

export default MIDISelect;

function MIDISelect(props) {
  const midi = useMIDI();

  if (!midi.inputs.length) {
    return 'No MIDI inputs';
  }

  return (
    <Select placeholder="Select MIDI Input">
      {midi.inputs.map((input) => (
        <option value={input.name}>{input.name}</option>
      ))}
    </Select>
  );
}
