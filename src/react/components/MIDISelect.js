import React from 'react';
import { Select } from '@chakra-ui/core';

import { useMIDI } from '../hooks/useMIDI';

export default MIDISelect;

function MIDISelect(props) {
  const midi = useMIDI();

  if (!midi.inputs[0]) {
    return 'No MIDI inputs';
  }

  function onChangeHandler(event) {
    console.log('setting: ', event.target.value);
    midi.selectInputByName(event.target.value);
  }

  return (
    <Select placeholder="Select MIDI Input" onChange={onChangeHandler}>
      {midi.inputs.map((input) => (
        <option key={input.name} value={input.name}>
          {input.name}
        </option>
      ))}
    </Select>
  );
}
