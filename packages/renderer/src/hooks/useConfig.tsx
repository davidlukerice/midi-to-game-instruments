import React, { useEffect, useState, useContext } from 'react';
import { set, cloneDeep } from 'lodash';
import { midiToGameInstruments } from '@app/preload'

const defaultState = {
  isLoading: true,
  appName: '',
  appVersion: '',
  config: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setValue: (_key: string, _value: string) => null
}

const configContext = React.createContext(defaultState);

// eslint-disable-next-line react-refresh/only-export-components
export { ConfigContextProvider, useConfig };

function ConfigContextProvider(props) {
  const { children } = props;

  const [state, setState] = useState({ ...defaultState, setValue });

  useEffect(() => {
    (async () => {
      const response = await midiToGameInstruments.getConfig();

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
    <configContext.Provider value={state} > {children} </configContext.Provider>
  );

  function setValue(key: string, value: string) {
    setState((curr) => {
      const newConfig = set(cloneDeep(curr.config), key, value);
      return {
        ...curr,
        config: newConfig,
      };
    });
    midiToGameInstruments.setConfig(key, value);
  }
}

function useConfig() {
  const context = useContext(configContext);
  if (!context) {
    throw new Error('useConfig must be used within a configContext');
  }
  return context;
}
