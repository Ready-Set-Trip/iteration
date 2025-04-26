// set up message board form here

import React, { useState } from 'react';

interface Message {
  id: number;
  author: string;
  text: string;
}

const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, author: 'TripLeader', text: 'Here we gooo!' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const handleInputChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAuthor(e.target.value);
  };

  const handleInputChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handlePostMessage = () => {
    if (newMessage.trim() !== '' && newAuthor.trim() !== '') {
      const newMessageToAdd: Message = {
        id: messages.length + 1,
        author: newAuthor,
        text: newMessage,
      };
      setMessages([newMessageToAdd, ...messages]);
      setNewMessage('');
      setNewAuthor('');
    }
  };

  return (
    <div>
      <h4>Get ready for your trip!</h4>
      <div>
        <div
          style={{
            overflow: 'scroll',
            height: '120px',
            border: '1px solid #fff',
            padding: '5px',
          }}
        >
          {messages.map((message) => (
            <div key={message.id}>
              <p>
                <strong>{message.author}</strong>: {message.text}
              </p>
            </div>
          ))}
        </div>
        <input
          type='text'
          placeholder='Your Name'
          value={newAuthor}
          onChange={handleInputChangeAuthor}
          style={{ width: '300px' }}
        />
        <div style={{ height: '5px' }} />
        <textarea
          rows={3}
          placeholder='Message Here'
          value={newMessage}
          onChange={handleInputChangeText}ç
          style={{ width: '300px' }}
        />
        <br />
        <button onClick={handlePostMessage}>Post</button>
      </div>
    </div>
  );
};

export default MessageBoard;
