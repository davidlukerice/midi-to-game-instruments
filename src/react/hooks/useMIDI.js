import WebMidi from 'webmidi';
import React, { useEffect, useState, useContext } from 'react';

const MIDIContext = React.createContext();

export { MidiContextProvider, useMIDI };

function MidiContextProvider(props) {
  const { children } = props;

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
    WebMidi.enable(function (err) {
      if (err) {
        setState((curr) => ({
          ...curr,
          isLoading: false,
          error: err,
        }));
      } else {
        // TODO: Remember previously selected midi input
        const input = WebMidi.inputs[0]
          ? WebMidi.getInputByName(WebMidi.inputs[0].name)
          : null;

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
  }, []);

  return <MIDIContext.Provider value={state}>{children}</MIDIContext.Provider>;

  function selectInputByName(inputName) {
    const input = WebMidi.getInputByName(inputName);
    setState((curr) => ({
      ...curr,
      selectedInput: input,
    }));
  }
}

function useMIDI() {
  // TODO: Guard against no context
  return useContext(MIDIContext);
}
