import { Client } from "@stomp/stompjs";
import gatewayApi from "./gatewayApi";

const CHAT_WS_URL = "ws://localhost:8084/websocket";

const emptyPayload = {
  queryParams: {},
  body: {},
};

export const getChatMessages = (chatId) => {
  return gatewayApi.post(`/chat-service/chat/${chatId}/messages`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
}

export const getChat = (rankingId) => {
  return gatewayApi.post(`/chat-service/chat/ranking/${rankingId}`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
};

const publishChatMessage = (chatId, message) => {
  return new Promise((resolve, reject) => {
    const stompClient = new Client({
      brokerURL: CHAT_WS_URL,
      reconnectDelay: 0,
      debug: () => {},
    });

    let settled = false;

    const settle = (handler, value) => {
      if (settled) {
        return;
      }

      settled = true;
      handler(value);
    };

    stompClient.onConnect = () => {
      try {
        stompClient.publish({
          destination: `/app/chat/${chatId}`,
          body: JSON.stringify(message),
        });

        setTimeout(() => {
          void stompClient.deactivate();
        }, 0);

        settle(resolve, true);
      } catch (error) {
        settle(reject, error);
      }
    };

    stompClient.onStompError = (frame) => {
      settle(
        reject,
        new Error(frame.headers?.message || "No se pudo enviar el mensaje."),
      );
    };

    stompClient.onWebSocketError = () => {
      settle(reject, new Error("No se pudo conectar al chat."));
    };

    stompClient.activate();
  });
};

export const sendChatMessage = async (rankingId, message) => {
  const chatResponse = await getChat(rankingId);
  const chatId = chatResponse?.data?.id;

  if (!chatId) {
    return false;
  }

  return publishChatMessage(chatId, message);
};



