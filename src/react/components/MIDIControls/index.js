import React from 'react';
import { Checkbox } from '@chakra-ui/core';

import MIDISelect from './MIDISelect';

import styles from './styles.module.css';

export default MIDIControls;

function MIDIControls() {
  return (
    <div className={styles.controlContainer}>
      <MIDISelect />
      <Checkbox defaultIsChecked isDisabled>
        Send Notes
      </Checkbox>
      <Checkbox isDisabled>Auto swap octave</Checkbox>
    </div>
  );
}
