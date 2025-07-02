import { useConfig } from '../../hooks/useConfig.js';

import MIDIControls from '../../components/MIDIControls/index.js';
import InstrumentSelector from '../../components/InstrumentSelector.js';
import PianoDisplay from '../../components/PianoDisplay.js';
import KeyMapDisplay from '../../components/KeyMapDisplay.js';
import MIDIMessageDisplay from '../../components/MIDIMessageDisplay.js';

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
