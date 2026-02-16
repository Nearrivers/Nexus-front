import { createContext } from "react";

import type { WebSocketMessage } from "@/contexts/wsProvider";

type WebSocketContextType = {
  isConnected: boolean;
  sendMessage: (message: object) => void;
  lastMessage: WebSocketMessage | null;
};

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null,
);
