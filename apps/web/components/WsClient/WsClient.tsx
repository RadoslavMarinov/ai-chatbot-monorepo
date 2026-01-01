'use client'

import React, { useEffect, useState } from 'react';

const WsClient: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Connect to the WebSocket server running on the API service
    // Use 'api' as the hostname because services can communicate by their names in docker-compose network
    const websocket = new WebSocket('ws://127.0.0.1:3002');

    websocket.onopen = () => {
      console.log('WebSocket Connected');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      setReceivedMessages((prev) => [...prev, event.data]);
    };

    websocket.onclose = () => {
      console.log('WebSocket Disconnected');
      setWs(null);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>WebSocket Client</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage} disabled={!ws}>Send</button>
      <div>
        <h2>Received Messages:</h2>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WsClient;
