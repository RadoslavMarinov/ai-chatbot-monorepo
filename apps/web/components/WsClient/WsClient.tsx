"use client";
import React, { use, useEffect, useReducer, useRef, useState } from "react";
import { ChatMessage } from "../Chat/ChatMessage";
import { TypingDots } from "../Loaders/TypingDots";

type Role = "system" | "user" | "assistant" | "function" | "tool";

interface ChatMessageI {
  content: string;
  role: Role;
}

type State = {
  message: string;
  loading: boolean;
  chatMessages: ChatMessageI[];
};

type Action =
  | { type: "set-message"; message: string }
  | { type: "ask-ai"; loading: boolean }
  | { type: "set-ai-response"; content: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "set-message": {
      return { ...state, message: action.message };
    }
    case "ask-ai":
      return {
        ...state,
        loading: action.loading,
        chatMessages: [...state.chatMessages, { content: state.message, role: "user" }] as ChatMessageI[],
      };
    case "set-ai-response":
      return {
        ...state,
        loading: false,
        chatMessages: [...state.chatMessages, { content: action.content, role: "assistant" }] as ChatMessageI[],
      };
    default:
      return state;
  }
};

const WsClient: React.FC = () => {
  const containerRef = useRef(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const [state, dispatch] = useReducer(reducer, {
    message: "",
    loading: false,
    chatMessages: [] as ChatMessageI[],
  });

  useEffect(() => {
    const websocket = new WebSocket("ws://127.0.0.1:3002");

    websocket.onopen = () => {
      console.log("WebSocket Connected");
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      dispatch({ type: "set-ai-response", content: event.data });
    };

    websocket.onclose = (ev) => {
      console.log("❌ WebSocket Disconnected ", ev);
      setWs(null);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessageToAi = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(state.message);
      dispatch({ type: "ask-ai", loading: true });
      dispatch({ type: "set-message", message: "" });
      // scroll the <div className="overflow-y-scroll h-96"> to the bottom
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      console.log(`👉 scrollHeight = `, scrollHeight);
      console.log(`👉 clientHeight = `, clientHeight);
      (containerRef.current as HTMLDivElement).scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  };

  function getStyling(role: Role) {
    switch (role) {
      case "system":
        return "bg-gray-200";
      case "user":
        return "bg-blue-200  mr-6";
      case "assistant":
        return "bg-gray-100 ml-6";
      case "function":
        return "bg-yellow-200";
      case "tool":
        return "bg-purple-200";
      default:
        return "";
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [state.chatMessages]);

  return (
    <div>
      <div ref={containerRef} className="overflow-y-scroll h-96">
        <ul className="flex flex-col gap-3">
          {state.chatMessages.map(({ content, role }, index) => (
            <li key={index}>
              <div className={`rounded-2xl ${getStyling(role)}`}>
                <p className="p-2 text-gray-500 italic capitalize mb-1">{role}</p>
                <div className="p-4">
                  <ChatMessage  content={content} />
                </div>
              </div>
            </li>
          ))}
          {state.loading && <li><TypingDots></TypingDots></li>}
        </ul>
      </div>
      <div className="flex flex-col items-center mt-4">
        <textarea
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              if (ws) sendMessageToAi();
            }
          }}
          className={`w-[40em] h-[10em]  border border-gray-300 rounded-md p-2`}
          value={state.message}
          onChange={(e) => dispatch({ type: "set-message", message: e.target.value })}
          placeholder="Type a message"
        />
        {state.loading && <TypingDots></TypingDots>}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          onClick={sendMessageToAi}
          disabled={!ws}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default WsClient;
