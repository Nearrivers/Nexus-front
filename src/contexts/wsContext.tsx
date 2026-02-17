import { createContext } from "react";

type WebSocketContextType = {
  isConnected: boolean;
  sendMessage: (message: object) => void;
};

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null,
);
