export type NoteDefinition = {
  key?: string
  octave?: number
  altOctave?: number
  altOctaveKey?: string
  forceInternalOctave?: number
}

export type KeyMap = {
  name: string
  autoOctaveSwap: boolean
  notes: Record<string, NoteDefinition>
  octaveDown?: { key: string }
  octaveUp?: { key: string }
}
