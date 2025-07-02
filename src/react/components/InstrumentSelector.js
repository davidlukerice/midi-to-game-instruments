import { Select } from '@mantine/core';
import { useConfig } from '../hooks/useConfig.js';

export default InstrumentSelector;

function InstrumentSelector() {
  const { config, setValue } = useConfig();
  const { selectedKeyMapIndex, keyMaps } = config;

  function onChangeHandler(selectedValue) {
    setValue('selectedKeyMapIndex', parseInt(selectedValue));
  }

  const keyMapOptions = keyMaps.map((keyMap, i) => ({
    label: keyMap.name, value: `${i}`
  }))

  return (
    <div>
      <span>Select instrument key map</span>
      <Select data={keyMapOptions} value={`${selectedKeyMapIndex}`} onChange={onChangeHandler} />
    </div>
  );
}
