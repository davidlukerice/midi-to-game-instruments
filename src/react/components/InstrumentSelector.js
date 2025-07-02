import { Select } from "@chakra-ui/react"

import { useConfig } from '../hooks/useConfig.js';

export default InstrumentSelector;

function InstrumentSelector(props) {
  const { config, setValue } = useConfig();
  const { selectedKeyMapIndex, keyMaps } = config;

  function onChangeHandler(event) {
    setValue('selectedKeyMapIndex', parseInt(event.target.value));
  }

  return (
    <div>
      <span>Select instrument key map</span>
      <Select value={selectedKeyMapIndex} onChange={onChangeHandler}>
        {keyMaps.map((keyMap, i) => (
          <option key={i} value={i}>
            {keyMap.name}
          </option>
        ))}
      </Select>
    </div>
  );
}
