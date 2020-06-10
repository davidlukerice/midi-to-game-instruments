import WebMidi from 'webmidi';
import { useEffect, useState } from 'react';

export { useMIDI };

function useMIDI() {
  const [state, setState] = useState({
    isLoading: true,
    error: null,
    message: '',
    inputs: [],
    outputs: [],
    selectedInput: null,
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
        console.log(WebMidi.inputs);
        console.log(WebMidi.outputs);

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

  const selectInputByName = (inputName) => {
    const input = WebMidi.getInputByName(inputName);
    setState((curr) => ({
      ...curr,
      selectedInput: input,
    }));
  };

  return {
    ...state,
    selectInputByName,
  };
}
