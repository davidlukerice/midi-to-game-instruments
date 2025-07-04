import { KeyMap } from '../types.js'

export const keyMap: KeyMap = {
  name: 'GW2 - Magnanimous Choir Bell (C) (Auto Octave)',
  autoOctaveSwap: true,
  notes: {
    C4: { key: '1', octave: 1 },
    D4: { key: '2', octave: 1 },
    E4: { key: '3', octave: 1 },
    F4: { key: '4', octave: 1 },
    G4: { key: '5', octave: 1 },
    A4: { key: '6', octave: 1 },
    B4: { key: '7', octave: 1 },
    C5: { key: '8', octave: 1, altOctave: 2, altOctaveKey: '1' },

    D5: { key: '2', octave: 2 },
    E5: { key: '3', octave: 2 },
    F5: { key: '4', octave: 2 },
    G5: { key: '5', octave: 2 },
    A5: { key: '6', octave: 2 },
    B5: { key: '7', octave: 2 },
    C6: { key: '8', octave: 2 },

    'C#4': { key: '9' },
    'D#4': { key: '0' }
  },
  octaveDown: { key: '9' },
  octaveUp: { key: '0' }
}
