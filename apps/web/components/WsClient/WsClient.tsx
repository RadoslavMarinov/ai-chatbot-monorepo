"use client";
import Markdown from "react-markdown";
import React, { useEffect, useReducer, useState } from "react";
import Spinner from "../Spinners/Spinner";
import { ChatMessage } from "../Chat/ChatMessage";
type State = {
  message: string;
  loading: boolean;
  aiResponses: string[];
};

type Action =
  | { type: "set-message"; message: string }
  | { type: "set-loading"; loading: boolean }
  | { type: "set-ai-response"; aiResponse: string };

const reducer = (state: State, action: Action) => {
  const { type } = action;
  switch (type) {
    case "set-message": {
      return {
        ...state,
        message: action.message,
      };
    }
    case "set-loading": {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case "set-ai-response": {
      return {
        ...state,
        aiResponses: [...state.aiResponses, action.aiResponse ],
      };
    }
    default:
      return state;
  }
};

const WsClient: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  const [state, dispatch] = useReducer(reducer, {
    message: "",
    loading: false,
    aiResponses: [],
  });

  useEffect(() => {
    // Connect to the WebSocket server running on the API service
    // Use 'api' as the hostname because services can communicate by their names in docker-compose network
    const websocket = new WebSocket("ws://127.0.0.1:3002");

    websocket.onopen = () => {
      console.log("WebSocket Connected");
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      dispatch({ type: "set-ai-response", aiResponse: event.data });
      dispatch({ type: "set-loading", loading: false });
    };

    websocket.onclose = () => {
      console.log("WebSocket Disconnected");
      setWs(null);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(state.message);
      dispatch({ type: "set-message", message: "" });
      dispatch({ type: "set-loading", loading: true });
    }
  };

  return (
    <div>
      <h1>🤖</h1>
      <textarea
        value={state.message}
        onChange={(e) => dispatch({ type: "set-message", message: e.target.value })}
        placeholder="Type a message"
        style={{ width: "40em", height: "10em" }}
      />
      <button onClick={sendMessage} disabled={!ws}>
        Send
      </button>
      {state.loading && <Spinner></Spinner>}
      <div>
        <h2>Received Messages:</h2>
        <ul>

          {state.aiResponses.map((msg, index) => (
            <li key={index}><ChatMessage content={msg}/></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WsClient;
