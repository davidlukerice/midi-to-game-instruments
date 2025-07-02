import { Checkbox } from '@mantine/core';

import { useConfig } from '../../hooks/useConfig.js';

import MIDISelect from './MIDISelect.js';

import styles from './styles.module.css';

export default MIDIControls;

const checkboxBorderColor = 'rgb(119, 124, 131)';

function MIDIControls() {
  const { config, setValue } = useConfig();

  // TODO: Fix unselected checkbox styling

  const onSendNotesChange = (event) => {
    const { checked } = event.currentTarget;
    setValue('sendNotes', checked);
  };

  const onAutoSwapOctaveChange = (event) => {
    const { checked } = event.currentTarget;
    setValue('autoSwapOctave', checked);
  };

  return (
    <div className={styles.controlContainer}>
      <MIDISelect />
      <Checkbox
        checked={config.sendNotes}
        onChange={onSendNotesChange}
        color={checkboxBorderColor}
        label="Send Notes"
      />
      <Checkbox
        checked={config.autoSwapOctave}
        onChange={onAutoSwapOctaveChange}
        color={checkboxBorderColor}
        label="Auto swap octave"
      />
    </div>
  );
}
