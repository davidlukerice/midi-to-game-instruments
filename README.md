# midi-to-keypress

This application converts midi messages to keyboard key presses.

I've primarily made this to be able to play GuildWars2 Instruments with a midi keyboard. It also provides some additional tools, like automatically shifting octaves in game, to help make playing smoother and more fun (at least in my opinion).

Primarily developing on windows 10, so support on other OSs is untested. It's theoretically possible, but I won't currently be proving builds.

## Guild Wars 2 Policy

Guild Wars 2 "macro" policy: https://en-forum.guildwars2.com/discussion/65554/policy-macros-and-macro-use

> You may use music macros to compose or perform in-game music. As long as the macro is used solely for the composition or performance of in-game music and the account is actively attended by a player, we do not place restrictions on its use.

I and this tool have no affiliation with Guild Wars 2 or ArenaNet.
Since this is for music performance only, it should be fine, but use at your own risk.
If you feel this tool provides functionality against Guild Wars 2's policy, don't use it.

## Running a local version on Windows

Install required dependencies

- `npm i` to download the latest

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
