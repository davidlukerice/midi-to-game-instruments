
import { useKeySender } from '../hooks/useKeySender.js';

export default PianoDisplay;

function PianoDisplay() {
  const { octave } = useKeySender();
  return <div>Octave {octave}</div>;
}
