import React, { useEffect, useRef } from 'react';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';

import { useKeySender } from '../hooks/useKeySender';

import styles from './MIDIMessageDisplay.module.css';

export default MIDIMessageDisplay;

function MIDIMessageDisplay(props) {
  const { sentMessages } = useKeySender();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    scrollIntoView(messagesEndRef.current);
  };

  useEffect(scrollToBottom, [sentMessages]);

  return (
    <div className={styles.MIDIMessageDisplay}>
      <h3 className={styles.header}>Messages</h3>
      <div className={styles.messages}>
        {sentMessages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
        <div key="endDiv" ref={messagesEndRef} />
      </div>
    </div>
  );
}
