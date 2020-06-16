import React from 'react';

import { useConfig } from '../../hooks/useConfig';

import MIDIControls from '../../components/MIDIControls';
import InstrumentSelector from '../../components/InstrumentSelector';
import PianoDisplay from '../../components/PianoDisplay';
import KeyMapDisplay from '../../components/KeyMapDisplay';
import MIDIMessageDisplay from '../../components/MIDIMessageDisplay';

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
          <InstrumentSelector />
          <PianoDisplay />
          <KeyMapDisplay />
          <div>
            Input used for testing key press <input />
          </div>
        </div>

        <div className={styles.rightContent}>
          <MIDIMessageDisplay />
        </div>
      </div>
      <footer className={styles.appFooter}>
        <span>v{config.appVersion}</span>
      </footer>
    </>
  );
}
