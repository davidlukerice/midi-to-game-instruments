import WebMidi from 'webmidi';
import React, { useEffect, useState, useContext } from 'react';
import { useConfig } from './useConfig';

const MIDIContext = React.createContext();

export { MidiContextProvider, useMIDI };

function MidiContextProvider(props) {
  const { children } = props;

  const config = useConfig();
  const [state, setState] = useState({
    isLoading: true,
    error: null,
    message: '',
    inputs: [],
    outputs: [],
    selectedInput: null,
    selectInputByName,
  });

  useEffect(() => {
    if (config.isLoading) {
      return;
    }

    WebMidi.enable(function (err) {
      if (err) {
        setState((curr) => ({
          ...curr,
          isLoading: false,
          error: err,
        }));
      } else {
        const input =
          WebMidi.getInputByName(config.config.selectedInputName) ||
          WebMidi.getInputByName(WebMidi.inputs[0]?.name) ||
          null;

        setState((curr) => ({
          ...curr,
          isLoading: false,
          message: 'midi enabled',
          inputs: WebMidi.inputs,
          outputs: WebMidi.outputs,
          selectedInput: input,
        }));
      }
    });
  }, [config]);

  return <MIDIContext.Provider value={state}>{children}</MIDIContext.Provider>;

  function selectInputByName(inputName) {
    config.setValue('selectedInputName', inputName);
    const input = WebMidi.getInputByName(inputName);
    setState((curr) => ({
      ...curr,
      selectedInput: input,
    }));
  }
}

function useMIDI() {
  const context = useContext(MIDIContext);
  if (!context) {
    throw new Error('useMIDI must be used within a MIDIContext');
  }
  return context;
}
