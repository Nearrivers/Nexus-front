import { WebSocketContext } from "@/contexts/wsContext";
import { useContext } from "react";

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within WebSocketProvider");
  }
  return context;
};
