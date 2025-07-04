import { KeyMap } from '../types.js'

export const keyMap: KeyMap = {
  // Notes in the key of E
  name: 'GW2 - Flute (E) (Auto Octave)',
  autoOctaveSwap: true,
  notes: {
    E4: { key: '1', octave: 1 },
    'F#4': { key: '2', octave: 1 },
    'G#4': { key: '3', octave: 1 },
    A4: { key: '4', octave: 1 },
    B4: { key: '5', octave: 1 },
    'C#5': { key: '6', octave: 1 },
    'D#5': { key: '7', octave: 1 },
    E5: { key: '8', octave: 1, altOctave: 2, altOctaveKey: '1' },

    'F#5': { key: '2', octave: 2 },
    'G#5': { key: '3', octave: 2 },
    A5: { key: '4', octave: 2 },
    B5: { key: '5', octave: 2 },
    'C#6': { key: '6', octave: 2 },
    'D#6': { key: '7', octave: 2 },
    E6: { key: '8', octave: 2 },

    // Swap octave
    F4: { key: '9' },
    // Stop playing
    G4: { key: '0' }
  },
  octaveDown: { key: '9' },
  octaveUp: { key: '9' }
}
