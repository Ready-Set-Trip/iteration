// set up message board form here

import React, { useState } from 'react';

function MessageBoard() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState(''); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);   
  };

  const handlePostMessage = () => {
    if (newMessage.trim() !== '') {
        setMessages([...messages, newMessage]);
        setNewMessage(''); 
    }
  }; 

  return (
    <div>
      <h4>Get ready for your trip!</h4>
      <div>
        <input
          type='text'
          value={newMessage}
          onChange={handleInputChange}
          placeholder='Whaddya wanna say to your TripMates?!'
        />
        <textarea
          rows={3}
          placeholder="Message Here"
          value={newMessage}
          onChange={handleInputChange}
        <button onClick={handlePostMessage}>Post</button>
      </div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default MessageBoard;
