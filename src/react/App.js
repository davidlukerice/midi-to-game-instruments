import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';

import { ConfigContextProvider, useConfig } from './hooks/useConfig';
import { MidiContextProvider, useMIDI } from './hooks/useMIDI';
import { KeySenderProvider } from './hooks/useKeySender';

import MainContent from './scenes/MainContent';

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
    content = <MainContent />;
  }

  return <div className={styles.app}>{content}</div>;
}

export default (props) => (
  <ThemeProvider>
    <ConfigContextProvider>
      <MidiContextProvider>
        <KeySenderProvider>
          <App {...props} />
        </KeySenderProvider>
      </MidiContextProvider>
    </ConfigContextProvider>
  </ThemeProvider>
);
