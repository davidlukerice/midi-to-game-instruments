import { Select } from '@mantine/core'
import { useConfig } from '../hooks/useConfig'

export default InstrumentSelector

function InstrumentSelector() {
  const { config, setValue } = useConfig()
  const { selectedKeyMapIndex, keyMaps } = config

  function onChangeHandler(selectedValue: string | null) {
    setValue('selectedKeyMapIndex', selectedValue ? parseInt(selectedValue) : 0)
  }

  const keyMapOptions = keyMaps.map((keyMap, i) => ({
    label: keyMap.name,
    value: `${i}`
  }))

  return (
    <div>
      <span>Select instrument key map</span>
      <Select
        data={keyMapOptions}
        value={`${selectedKeyMapIndex}`}
        onChange={onChangeHandler}
      />
    </div>
  )
}
