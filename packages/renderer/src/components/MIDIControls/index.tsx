import { Checkbox } from '@mantine/core'

import { useConfig } from '../../hooks/useConfig'

import MIDISelect from './MIDISelect'

import styles from './styles.module.css'
import type { ChangeEventHandler } from 'react'

export default MIDIControls

const checkboxBorderColor = 'rgb(119, 124, 131)'

function MIDIControls() {
  const { config, setValue } = useConfig()

  const onSendNotesChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked } = event.currentTarget
    setValue('sendNotes', checked)
  }

  const onAutoSwapOctaveChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { checked } = event.currentTarget
    setValue('autoSwapOctave', checked)
  }

  return (
    <div className={styles.controlContainer}>
      <MIDISelect />
      <Checkbox
        checked={config.sendNotes}
        onChange={onSendNotesChange}
        color={checkboxBorderColor}
        label='Send Notes'
      />
      <Checkbox
        checked={config.autoSwapOctave}
        onChange={onAutoSwapOctaveChange}
        color={checkboxBorderColor}
        label='Auto swap octave'
      />
    </div>
  )
}
