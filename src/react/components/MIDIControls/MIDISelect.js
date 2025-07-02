

import { Select } from '@mantine/core';
import { useMIDI } from '../../hooks/useMIDI.js';

export default MIDISelect;

function MIDISelect(props) {
  const midi = useMIDI();

  if (!midi.inputs[0]) {
    return 'No MIDI inputs';
  }

  function onChangeHandler(selectedDevice) {
    console.log('setting: ', selectedDevice);
    midi.selectInputByName(selectedDevice);
  }

  const selectedValue = midi.selectedInput ? midi.selectedInput.name : '';

  const midiInputs = midi.inputs.map((input) => (
    { label: input.name, value: input.name }
  ))

  return (
    <div>
      <span>Select a MIDI input</span>
      <Select data={midiInputs} value={selectedValue} onChange={onChangeHandler} />
    </div>
  );
}
