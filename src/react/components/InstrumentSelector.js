import React from 'react';
import { useConfig } from '../hooks/useConfig';

import { Select } from '@chakra-ui/core';

export default InstrumentSelector;

function InstrumentSelector(props) {
  const { config, setValue } = useConfig();
  const { selectedKeyMap, keyMaps } = config;

  function onChangeHandler(event) {
    setValue('selectedKeyMap', event.target.value);
  }

  return (
    <div>
      <span>Select instrument key map</span>
      <Select value={selectedKeyMap} onChange={onChangeHandler}>
        {keyMaps.map((keyMap, i) => (
          <option key={i} value={i}>
            {keyMap.name}
          </option>
        ))}
      </Select>
    </div>
  );
}
