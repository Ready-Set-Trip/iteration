import React, { useState, useEffect } from 'react';

interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string;
  tripID: string;
}

interface MessageBoardProps {
  tripID: string;
}

const MessageBoard: React.FC<MessageBoardProps> = ({ tripID }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState({
    fetching: false,
    posting: false
  });
  const [error, setError] = useState<string | null>(null);

  // Load messages when component mounts or tripID changes
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(prev => ({ ...prev, fetching: true }));
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3000/messageBoard?tripID=${encodeURIComponent(tripID)}`
        );
        
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        
        const data = await response.json();
        // Messages are already in DESC order from server
        setMessages(data.messages || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load messages');
      } finally {
        setIsLoading(prev => ({ ...prev, fetching: false }));
      }
    };

    loadMessages();
  }, [tripID]);

  const handlePostMessage = async () => {
    if (!newName.trim() || !newMessage.trim()) {
      setError('Name and message are required');
      return;
    }

    setIsLoading(prev => ({ ...prev, posting: true }));
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3000/messageBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName.trim(),
          message: newMessage.trim(),
          tripID: tripID.trim()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to post message');
      }

      // Get the newly posted message from response
      const result = await response.json();
      
      // Add the new message to the beginning of the array
      setMessages(prev => [result.message, ...prev]);
      
      // Clear form fields
      setNewMessage('');
      setNewName('');
      
    } catch (err) {
      console.error('Post error:', err);
      setError(err instanceof Error ? err.message : 'Failed to post message');
    } finally {
      setIsLoading(prev => ({ ...prev, posting: false }));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h4>Message Board for Trip {tripID}</h4>
      
      {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}
      
      <div style={{
        height: '300px',
        width: '75%',
        overflowY: 'auto',
        color: 'black',
        border: '1px solid #ddd',
        padding: '10px',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9'
      }}>
        {isLoading.fetching ? (
          <div>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div>No messages yet. Be the first to post!</div>
        ) : (
          messages.map(message => (
            <div key={message.id} style={{
              marginBottom: '10px',
              paddingBottom: '10px',
              borderBottom: '1px solid #eee'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{message.name}</strong>
                <small>
                  {new Date(message.created_at).toLocaleString()}
                </small>
              </div>
              <p style={{ margin: '5px 0 0 0' }}>{message.message}</p>
            </div>
          ))
        )}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Your Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          disabled={isLoading.posting}
          style={{
            width: '100%',
            padding: '8px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <textarea
          rows={3}
          placeholder="Your Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={isLoading.posting}
          style={{
            width: '100%',
            padding: '8px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <button
        onClick={handlePostMessage}
        disabled={isLoading.posting || !newName.trim() || !newMessage.trim()}
        style={{
          padding: '8px 16px',
          backgroundColor: isLoading.posting ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading.posting ? 'not-allowed' : 'pointer',
        }}
      >
        {isLoading.posting ? 'Posting...' : 'Post Message'}
      </button>
    </div>
  );
};

export default MessageBoard;