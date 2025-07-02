import { JsonEditor, githubLightTheme } from 'json-edit-react'

import { useConfig } from '../hooks/useConfig';

import styles from './KeyMapDisplay.module.css';

export default KeyMapDisplay;

function KeyMapDisplay() {
  const { config } = useConfig();
  const { selectedKeyMapIndex, keyMaps } = config;

  // TODO: May be able to allow edit/add from here for updating the configs

  const keyMap = keyMaps[selectedKeyMapIndex]

  return (
    <div className={styles.container}>
      <h3>KeyMap</h3>
      <div className={styles.jsonContainer}>
        <JsonEditor
          data={keyMap}
          viewOnly
          theme={githubLightTheme}
        />
      </div>
    </div>
  );
}
