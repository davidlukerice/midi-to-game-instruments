import React from 'react';
import ReactJsonView from 'react-json-view';

import { useConfig } from '../hooks/useConfig';

import styles from './KeyMapDisplay.module.css';

export default KeyMapDisplay;

function KeyMapDisplay() {
  const { config } = useConfig();
  const { selectedKeyMapIndex, keyMaps } = config;

  // TODO: May be able to allow edit/add from here for updating the configs

  return (
    <div className={styles.container}>
      <h3>KeyMap</h3>
      <div className={styles.jsonContainer}>
        <ReactJsonView
          name="keyMap"
          src={keyMaps[selectedKeyMapIndex]}
          theme="harmonic"
          displayDataTypes={false}
        />
      </div>
    </div>
  );
}
