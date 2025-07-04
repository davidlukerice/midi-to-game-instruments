import { KeyMap } from '../types.js'

import { keyMap as gw2GrandPianoAuto } from './gw2_grandPiano_auto.js'
import { keyMap as gw2MinstrelAuto } from './gw2_minstrel_auto.js'
import { keyMap as gw2Minstrel } from './gw2_minstrel.js'
import { keyMap as gw2ChoirBellAuto } from './gw2_choirBell_auto.js'
import { keyMap as gw2FluteCAuto } from './gw2_fluteC_auto.js'
import { keyMap as gw2FluteEAuto } from './gw2_fluteE_auto.js'

export const keyMaps: KeyMap[] = [
  gw2GrandPianoAuto,
  gw2MinstrelAuto,
  gw2Minstrel,
  gw2ChoirBellAuto,
  gw2FluteCAuto,
  gw2FluteEAuto
  // TODO: GW2 - Lute
  // TODO: GW2 - Bass Guitar
]
