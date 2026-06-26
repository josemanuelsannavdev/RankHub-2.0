import { Client } from "@stomp/stompjs";
import gatewayApi from "./gatewayApi";

const EVENT_WS_URL = import.meta.env.VITE_BET_WS_URL ?? "ws://localhost:8086/websocket";

const emptyPayload = {
  queryParams: {},
  body: {},
};

export const getEvents = (rankingId) => {
  return gatewayApi.post(`/bets-service/event/ranking/${rankingId}`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
}

export const getEvent = (eventId) => {
  return gatewayApi.post(`/bets-service/event/${eventId}`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
};

export const createEvent = (eventData) => {
  return gatewayApi.post(`/bets-service/event`, {
    targetMethod: "POST",
    body: eventData,
  });
}

export const getBetsForEvent = (eventId) => {
  return gatewayApi.post(`/bets-service/event/bets/${eventId}`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
}

export const closeEvent = (eventId, creatorName) => {
  return publishEventMessage(eventId, {
    action: "CLOSE",
    creatorName,
  });
};
export const finishEvent = (eventId,sideId) => {
  return gatewayApi.post(`/bets-service/event/finish/${eventId}/${sideId}`, {
    targetMethod: "PUT",
    ...emptyPayload,
  });
};

const publishEventMessage = (eventId, message) => {
  return new Promise((resolve, reject) => {
    const stompClient = new Client({
      brokerURL: EVENT_WS_URL,
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
          destination: `/app/event/${eventId}`,
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



