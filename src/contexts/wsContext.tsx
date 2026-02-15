import { createContext, useEffect, useRef, useState } from "react";

type WebSocketContextType = {
  isConnected: boolean;
  sendMessage: (message: object) => void;
  lastMessage: WebSocketMessage | null;
};

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null,
);
