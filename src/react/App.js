import React, { useState, useEffect } from 'react';

import { channels } from '../shared/constants';
import { useMIDI } from './hooks/useMIDI';
import MIDIDisplay from './components/MIDIDisplay';
import MIDISelect from './components/MIDISelect';

import styles from './App.module.css';

const { ipcRenderer } = window;

function App() {
  const [state, setState] = useState({
    appName: '',
    appVersion: '',
  });
  const midi = useMIDI();

  useEffect(() => {
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      setState({ appName, appVersion });
    });
  }, []);

  let content;
  if (midi.isLoading) {
    content = <div>MIDI loading...</div>;
  } else if (midi.error) {
    content = <div>Error starting midi</div>;
  } else {
    content = (
      <>
        <MIDISelect />
        <p>
          <MIDIDisplay />
        </p>
      </>
    );
  }

  const { appName, appVersion } = state;
  return (
    <div className={styles.app}>
      <header className="App-header">
        <p>
          {appName} version {appVersion}
        </p>
      </header>
      <div>{content}</div>
    </div>
  );
}

export default App;
