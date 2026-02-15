import { useEffect, useRef, useState, type ReactNode } from "react";

import { WebSocketContext } from "@/contexts/wsContext";

type WebSocketMessage = {
  event: string;
  data: object;
  player_id?: string;
};

type TimeoutId = number;

type WebSocketProviderProps = {
  playerId: string;
  children: ReactNode;
};

const WebSocketProvider = ({ children, playerId }: WebSocketProviderProps) => {
  const reconnectTimeout = useRef<TimeoutId | null>(null);

  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);

  const connect = () => {
    const apiWsEndpoint = import.meta.env.VITE_API_HOST.includes("https")
      ? import.meta.env.VITE_API_HOST.replace("https", "wss")
      : import.meta.env.VITE_API_HOST.replace("http", "ws");

    // Connexion WebSocket
    const socket = new WebSocket(`${apiWsEndpoint}/ws?player_id=${playerId}`);

    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("WebSocket message:", message);
      setLastMessage(message);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);

      // Reconnexion automatique après 3s
      reconnectTimeout.current = setTimeout(() => {
        console.log("Reconnecting...");
        connect();
      }, 3000);
    };

    ws.current = socket;
  };

  useEffect(() => {
    if (playerId) {
      connect();
    }

    return () => {
      // Cleanup
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [playerId]);

  const sendMessage = (message: object) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return (
    <WebSocketContext.Provider
      value={{ isConnected, sendMessage, lastMessage }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
