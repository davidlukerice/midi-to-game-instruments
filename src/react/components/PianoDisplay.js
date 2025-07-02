
import { useKeySender } from '../hooks/useKeySender.js';

export default PianoDisplay;

function PianoDisplay(props) {
  const { octave } = useKeySender();
  return <div>Octave {octave}</div>;
}
