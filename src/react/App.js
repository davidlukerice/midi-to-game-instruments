import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';

import { ConfigContextProvider, useConfig } from './hooks/useConfig';
import { MidiContextProvider, useMIDI } from './hooks/useMIDI';
import MIDIDisplay from './components/MIDIDisplay';
import MIDIKeySender from './components/MIDIKeySender';
import MIDISelect from './components/MIDISelect';

import styles from './App.module.css';

function App() {
  const config = useConfig();
  const midi = useMIDI();

  let content;
  if (config.isLoading) {
    content = <div>Config loading...</div>;
  } else if (midi.isLoading) {
    content = <div>MIDI loading...</div>;
  } else if (midi.error) {
    content = <div>Error starting midi</div>;
  } else {
    content = (
      <>
        <MIDISelect />
        <MIDIDisplay />
        <MIDIKeySender />
      </>
    );
  }

  return (
    <div className={styles.app}>
      <header className="App-header">
        <p>
          {config.appName} v{config.appVersion}
        </p>
      </header>
      <div>{content}</div>
    </div>
  );
}

export default (props) => (
  <ThemeProvider>
    <ConfigContextProvider>
      <MidiContextProvider>
        <App {...props} />
      </MidiContextProvider>
    </ConfigContextProvider>
  </ThemeProvider>
);
