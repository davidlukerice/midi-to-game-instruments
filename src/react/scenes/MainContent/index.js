import React from 'react';

import MIDIDisplay from '../../components/MIDIDisplay';
import MIDIControls from '../../components/MIDIControls';
import { useConfig } from '../../hooks/useConfig';

import styles from './styles.module.css';

export default MainContent;

function MainContent() {
  const config = useConfig();

  return (
    <>
      <header className={styles.appHeader}>
        <MIDIControls />
      </header>
      <div className={styles.appContent}>
        <div className={styles.leftContent}>
          Input used for testing key press <input />
        </div>
        <div className={styles.rightContent}>
          <MIDIDisplay />
        </div>
      </div>
      <footer className={styles.appFooter}>
        <span>v{config.appVersion}</span>
      </footer>
    </>
  );
}
