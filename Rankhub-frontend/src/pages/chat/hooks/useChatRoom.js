import { useCallback, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { getChat } from "../../../services/chatApi";
import { getSessionEmail } from "../../../services/session";
import {useRanking} from "../../../context/RankingContext";
const CHAT_WS_URL = "ws://localhost:8084/websocket";
const DEFAULT_SUBSCRIPTION = "/topic/chat/";
const DEFAULT_DESTINATION = "/app/envio";





const normalizeIncomingMessage = (rawMessage) => {
  if (!rawMessage || typeof rawMessage !== "object") {
    return null;
  }

  return {
    id:
      rawMessage.id ??
      rawMessage.messageId ??
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    username: rawMessage.username ,
    body: rawMessage.body ,
  };
};

const useChatRoom = () => {
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [connectionError, setConnectionError] = useState(null);
  const [userName, setuserName] = useState(() => getSessionEmail() );
  const [chatData, setChatData] = useState(null);
  const { currentRanking } = useRanking();

  const handleIncomingMessage = useCallback((messageFrame) => {
    try {
      const parsedMessage = JSON.parse(messageFrame.body);
      const normalizedMessage = normalizeIncomingMessage(parsedMessage);

      if (!normalizedMessage) {
        return;
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        normalizedMessage,
      ]);
    } catch (error) {
      console.error("Error parsing chat message:", error);
    }
  }, []);

  useEffect(() => {
     
    const fetchChatData = async () => {
      try {
        const chatResponse = await getChat(currentRanking.id);
      
        setChatData(chatResponse.data);
        setMessages(
          (chatResponse.data.messages || [])
            .map(normalizeIncomingMessage)
            .filter(Boolean),
        );
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatData();
  }, [userName]);


  useEffect(() => {
    let isActive = true;

    const stompClient = new Client({
      brokerURL: CHAT_WS_URL,
      reconnectDelay: 5000,
      debug: () => {},
    });

    stompClient.onConnect = () => {
      if (!isActive) {
        return;
      }

      setConnectionStatus("connected");
      setConnectionError(null);

      stompClient.subscribe(`/topic/chat/${chatData.id}`, handleIncomingMessage);
    };

    stompClient.onWebSocketClose = () => {
      if (isActive) {
        setConnectionStatus("disconnected");
      }
    };

    stompClient.onStompError = (frame) => {
      if (!isActive) {
        return;
      }

      setConnectionStatus("error");
      setConnectionError(
        frame.headers?.message || "No se pudo conectar al chat.",
      );
      console.error("Chat STOMP error:", frame.headers?.message);
    };

    stompClient.activate();
    setClient(stompClient);

    return () => {
      isActive = false;
      stompClient.deactivate();
    };
  }, [chatData]);

  const sendMessage = useCallback(
    (content) => {
      const normalizedContent = content.trim();
      const normalizedName = userName.trim() ;
      
      if (!normalizedContent || !client?.connected) {
        return false;
      }
        
      client.publish({
        //destination: `/chat/${chatId}`,
        destination: `/app/chat/${chatData.id}`,
        body: JSON.stringify({
          username: normalizedName,
          body: normalizedContent,
        }),
      });

      return true;
    },
    [userName, client],
  );

  return {
    messages,
    userName,
    setuserName,
    sendMessage,
    connectionStatus,
    connectionError,
  };
};

export default useChatRoom;
