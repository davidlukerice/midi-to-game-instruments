const keyMaps = [
  {
    name: 'GW2 - The Minstrel (Auto Octave)',
    autoOctaveSwap: true,
    // 'note' is the piano note
    notes: {
      // 'key' is the computer keyboard key
      // 'octave' is a relative number used to represent the
      // multiple skill bars GW2 has that a user can swap among.
      // The Minstrel, for example, has low (0), medium (1), and
      // high (2) octaves.
      C3: { key: '1', octave: 0 },
      D3: { key: '2', octave: 0 },
      E3: { key: '3', octave: 0 },
      F3: { key: '4', octave: 0 },
      G3: { key: '5', octave: 0 },
      A3: { key: '6', octave: 0 },
      B3: { key: '7', octave: 0 },

      // AltOctave allows the same note on a different skills octave
      // to be played without having to change octaves
      C4: { key: '1', octave: 1, altOctave: 0, altOctaveKey: '8' },
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

      // Since The Minstrel plays in the key of C, we can use
      // sharp notes for "key switches". In the case below, they
      // allow manual actave shifts in the case that GW2 lags and doesn't
      // switch correctly
      'C#4': { key: '9' },
      'D#4': { key: '0' },

      // Sets the internal app's octave (Not yet implemented)
      'F#4': { forceInternalOctave: 0 },
      'G#4': { forceInternalOctave: 1 },
      'A#4': { forceInternalOctave: 2 },
    },
    octaveDown: { key: '9' },
    octaveUp: { key: '0' },
  },
];

module.exports = { keyMaps };
