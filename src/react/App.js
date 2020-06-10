import React, { useState, useEffect } from 'react';
import { channels } from '../shared/constants';
import './App.css';

const { ipcRenderer } = window;

function App() {
  const [state, setState] = useState({
    appName: '',
    appVersion: '',
  });

  useEffect(() => {
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      setState({ appName, appVersion });
    });
  }, []);

  const { appName, appVersion } = state;
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {appName} version {appVersion}
        </p>
      </header>
    </div>
  );
}

export default App;
