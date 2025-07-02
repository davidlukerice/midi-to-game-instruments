
import { Provider } from "./components/ui/provider.jsx"

import { ConfigContextProvider, useConfig } from './hooks/useConfig.js';
import { MidiContextProvider, useMIDI } from './hooks/useMIDI.js';
import { KeySenderProvider } from './hooks/useKeySender.js';

import MainContent from './scenes/MainContent/index.js';

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

const WrappedApp = (props) => (
  <Provider>
    <ConfigContextProvider>
      <MidiContextProvider>
        <KeySenderProvider>
          <App {...props} />
        </KeySenderProvider>
      </MidiContextProvider>
    </ConfigContextProvider>
  </Provider>
);

export default WrappedApp
