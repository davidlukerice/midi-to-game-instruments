import React, { useEffect, useState, useContext } from 'react';
import { set, cloneDeep } from 'lodash';

import { channels } from '../../shared/constants';

const { ipcRenderer } = window;

const configContext = React.createContext();

export { ConfigContextProvider, useConfig };

function ConfigContextProvider(props) {
  const { children } = props;

  const [state, setState] = useState({
    isLoading: true,
    appName: '',
    appVersion: '',
    config: null,
    setValue,
  });

  useEffect(() => {
    (async () => {
      const response = await ipcRenderer.invoke(channels.GET_CONFIG);

      setState((curr) => ({
        ...curr,
        isLoading: false,
        appName: response.appName,
        appVersion: response.appVersion,
        config: response.config,
      }));
    })();
  }, []);

  return (
    <configContext.Provider value={state}>{children}</configContext.Provider>
  );

  function setValue(key, value) {
    setState((curr) => {
      const newConfig = set(cloneDeep(curr.config), key, value);
      return {
        ...curr,
        config: newConfig,
      };
    });
    ipcRenderer.send(channels.SET_CONFIG, key, value);
  }
}

function useConfig() {
  const context = useContext(configContext);
  if (!context) {
    throw new Error('useConfig must be used within a configContext');
  }
  return context;
}
