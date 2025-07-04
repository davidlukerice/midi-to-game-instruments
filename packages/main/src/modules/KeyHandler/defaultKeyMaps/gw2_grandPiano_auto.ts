import { KeyMap } from '../types.js'

// TODO
export const keyMap: KeyMap = {
  name: 'GW2 - Ornate Grand Piano (C) (Auto Octave)',
  autoOctaveSwap: true,
  // 'note' is the piano note
  notes: {
    // 'key' is the computer keyboard key
    // 'octave' is a relative number used to represent the
    // multiple skill bars GW2 has that a user can swap among.
    // The Ornate Grand Piano, for example, has low (0), medium (1), and
    // high (2) octaves.

    C3: { key: '1', octave: 0 },
    'C#3': { key: 'f1', octave: 0 }, // Df3
    D3: { key: '2', octave: 0 },
    'D#3': { key: 'f2', octave: 0 }, // Ef3
    E3: { key: '3', octave: 0 },
    F3: { key: '4', octave: 0 },
    'F#3': { key: 'f3', octave: 0 }, // Gf3
    G3: { key: '5', octave: 0 },
    'G#3': { key: 'f4', octave: 0 }, // Af3
    A3: { key: '6', octave: 0 },
    'A#3': { key: 'f5', octave: 0 }, // Bf3
    B3: { key: '7', octave: 0 },

    // AltOctave allows the same note on a different skills octave
    // to be played without having to change octaves
    C4: { key: '1', octave: 1, altOctave: 0, altOctaveKey: '8' },
    'C#4': { key: 'f1', octave: 0 }, // Df4
    D4: { key: '2', octave: 1 },
    'D#4': { key: 'f2', octave: 0 }, // Ef4
    E4: { key: '3', octave: 1 },
    F4: { key: '4', octave: 1 },
    'F#4': { key: 'f3', octave: 0 }, // Gf4
    G4: { key: '5', octave: 1 },
    'G#4': { key: 'f4', octave: 0 }, // Af4
    A4: { key: '6', octave: 1 },
    'A#4': { key: 'f5', octave: 0 }, // Bf4
    B4: { key: '7', octave: 1 },

    C5: { key: '8', octave: 1, altOctave: 2, altOctaveKey: '1' },
    'C#5': { key: 'f1', octave: 0 }, // Df5
    D5: { key: '2', octave: 2 },
    'D#5': { key: 'f2', octave: 0 }, // Ef5
    E5: { key: '3', octave: 2 },
    F5: { key: '4', octave: 2 },
    'F#5': { key: 'f3', octave: 0 }, // Gf5
    G5: { key: '5', octave: 2 },
    'G#5': { key: 'f4', octave: 0 }, // Af5
    A5: { key: '6', octave: 2 },
    'A#5': { key: 'f5', octave: 0 }, // Bf5
    B5: { key: '7', octave: 2 },
    C6: { key: '8', octave: 2 }

    // TODO: Minor Chords
    // TODO: Major Chords

    // Other notes can be used for "key switches", or "non played" notes
    // that affect functionality in the app or game.
    // In the case below, they allow manual actave shifts in the
    // case that GW2 lags and doesn't switch correctly
    // 'C#4': { key: '9' },
    // 'D#4': { key: '0' },

    // Sets the internal app's octave (Not yet implemented)
    // 'F#4': { forceInternalOctave: 0 },
    // 'G#4': { forceInternalOctave: 1 },
    // 'A#4': { forceInternalOctave: 2 },
  },
  octaveDown: { key: '9' },
  octaveUp: { key: '0' }
}
