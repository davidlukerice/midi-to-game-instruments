# midi-to-keypress

This application converts midi messages to keyboard key presses.

I've primarily made this to be able to play GuildWars2 Instruments with a midi keyboard. It also provides some additional tools, like automatically shifting octaves in game, to help make playing smoother and more fun (at least in my opinion).
There's still lag inherent in playing GuildWars 2 instruments, but it's fairly consistent, so I tend to have my piano's sound louder than the in game instrument's sound and follow that one instead of what's in game.

Primarily developing on windows 10, so support on other OSs is untested. It's theoretically possible, but I won't currently be proving builds.

## Guild Wars 2 Policy

Guild Wars 2 "macro" policy: https://en-forum.guildwars2.com/discussion/65554/policy-macros-and-macro-use

> You may use music macros to compose or perform in-game music. As long as the macro is used solely for the composition or performance of in-game music and the account is actively attended by a player, we do not place restrictions on its use.

I and this tool have no affiliation with Guild Wars 2 or ArenaNet.
Since this is for music performance only, it should be fine, but use at your own risk.
If you feel this tool provides functionality against Guild Wars 2's policy, don't use it.

## Config

Most values in the app are exposed via a .json config. Use `File -> Open Config` or `File -> Open Config Folder` to edit it. Once the app is started and a change is made, the config will automatically be generated for you. If it's become messed up, delete any existing config and restart the application.

### selectedInputName

The name of the selected MIDI input.

### selectedKeyMapIndex

The index of the selected key map in the keyMaps array.

### sendNotes

Whether key presses should be sending. I use it when working out a song on the piano before I want anything sent in game.

### autoSwapOctave

The app will retain internally what octave is currently being played. If a note is in a different octave, the app will try and auto swap to that new notes octave. It works fairly well when moving a single octave but can have trouble with two or more since GW2 can be inconsistent when quickly tapping octave shifts.

### multipleOctaveShiftDelay

A delay gets added when auto shifting more than one octave. If this is too low, the game may not recognize multiple octave shifts. If too high, it adds unnecessary delay and can mess up how smoothly the song is playing. 75 tends to work fairly well for me, but it depends on ping and if the GW2 client is behaving well or not.

### keyMaps

Instrument keymaps. Feel free to add your own in the config to use in the app.
Named with the following convention:

```
game - instrumentName (key and any transposes) (if designed for use with auto octave)
```

## Keymap example

See `/electron/defaultKeyMaps` for current default keymaps.

```
{
  name: 'GW2 - The Minstrel (Auto Octave)',

  // (Not yet implemented. Flag stored on the top level config used)
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
}
```

## Running a local version on Windows

Install required dependencies

- `npm i` to download the latest
- Copy `.env-example` to `.env`

Build RobotJS (https://github.com/octalmage/robotjs/issues/466#issuecomment-600197990)

- `npm install -g node-gyp`
- `npx electron-rebuild -f -t prod,optional,dev -v 9.0.3 -w robotjs`

Alternative method for building RobotJS
(https://stackoverflow.com/a/46897783/833733)

- `npm install --global windows-build-tools` (as admin)
- `npm run rebuild-robotjs`

Start up the related dev servers in different terminal windows

- `npm run start`
- `npm run electron-start`

## Building and Packaging on Windows

- `npm run build`
- `npm run electron-build`
- `npm run package`
