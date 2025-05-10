import React, { useState, useEffect } from 'react';

interface Message {
  id: number;
  name: string;
  message: string;
  created_at?: string;
}

const MessageBoard: React.FC = (props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newName, setNewName] = useState('');

  // Load messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:3000/messageBoard');
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data.messages.reverse());
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleInputChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handlePostMessage = async () => {
    if (newMessage.trim() === '' || newName.trim() === '') return;

    try {
      const response = await fetch('http://localhost:3000/messageBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
          message: newMessage,
        }),
      });

      if (!response.ok) throw new Error('Failed to post message');

      const result = await response.json();
      // Add the new message to the beginning of the messages array
      setMessages([result.message, ...messages]);
      setNewMessage('');
      setNewName('');
    } catch (error) {
      console.error('Error posting message:', error);
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
                <strong>{message.name}</strong>: {message.message}
              </p>
            </div>
          ))}
        </div>
        <input
          type='text'
          placeholder='Your Name'
          value={newName}
          onChange={handleInputChangeName}
          style={{ width: '300px' }}
        />
        <div style={{ height: '5px' }} />
        <textarea
          rows={3}
          placeholder='Message Here'
          value={newMessage}
          onChange={handleInputChangeText}
          style={{ width: '300px' }}
        />
        <br />
        <button onClick={handlePostMessage}>Post</button>
      </div>
    </div>
  );
};

export default MessageBoard;
