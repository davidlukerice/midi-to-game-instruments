import React from 'react';
import { Checkbox } from '@chakra-ui/core';

import { useConfig } from '../../hooks/useConfig.js';

import MIDISelect from './MIDISelect';

import styles from './styles.module.css';

export default MIDIControls;

const checkboxBorderColor = 'rgb(119, 124, 131)';

function MIDIControls() {
  const { config, setValue } = useConfig();

  // TODO: Fix unselected checkbox styling

  const onSendNotesChange = (e) => {
    const { checked } = e.target;
    setValue('sendNotes', checked);
  };

  const onAutoSwapOctaveChange = (e) => {
    const { checked } = e.target;
    setValue('autoSwapOctave', checked);
  };

  return (
    <div className={styles.controlContainer}>
      <MIDISelect />
      <Checkbox
        isChecked={config.sendNotes}
        onChange={onSendNotesChange}
        borderColor={checkboxBorderColor}
      >
        Send Notes
      </Checkbox>
      <Checkbox
        isChecked={config.autoSwapOctave}
        onChange={onAutoSwapOctaveChange}
        borderColor={checkboxBorderColor}
      >
        Auto swap octave
      </Checkbox>
    </div>
  );
}
