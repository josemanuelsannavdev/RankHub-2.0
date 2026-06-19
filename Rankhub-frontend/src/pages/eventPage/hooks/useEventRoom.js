import { useCallback, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";
const EVENT_WS_URL = "ws://localhost:8086/websocket";
const DEFAULT_SUBSCRIPTION = "/topic/chat/";
const DEFAULT_DESTINATION = "/app/envio";
import { closeEvent as publishCloseEvent, getEvent, getBetsForEvent } from "../../../services/betApi";
import { getSessionEmail } from "../../../services/session";
const useEventRoom = ({ eventId }) => {
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [connectionError, setConnectionError] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [bets, setBets] = useState([]);
  const sessionEmail = getSessionEmail();
  const handleIncomingBet = useCallback((betFrame) => {
    try {
      const parsedBet = JSON.parse(betFrame.body);

      if (parsedBet?.action === "CLOSE") {
        setConnectionStatus("closed");
        setConnectionError(null);
        navigate("/viewEventsPage", { replace: true });
        return;
      }

      if (parsedBet?.action === "DELETE") {
        setBets((previousBets) =>
          previousBets.filter((currentBet) => currentBet.id !== parsedBet.id),
        );
        return;
      }

      setBets((previousBets) => [...previousBets, parsedBet]);
    } catch (error) {
      console.error("Error parsing event message:", error);
    }
  }, [navigate]);

  const handleStompError = useCallback((frame) => {
    setConnectionStatus("error");
    setConnectionError(
      frame.headers?.message || "No se pudo conectar al chat.",
    );
    console.error("Chat STOMP error:", frame.headers?.message);
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventResponse = await getEvent(eventId);
        setEventData(eventResponse.data);
        const betsResponse = await getBetsForEvent(eventId);
        setBets(betsResponse.data || []);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    let isActive = true;

    const stompClient = new Client({
      brokerURL: EVENT_WS_URL,
      reconnectDelay: 0,
      debug: () => {},
    });

    stompClient.onConnect = () => {
      if (!isActive) {
        return;
      }
      setConnectionStatus("connected");
      setConnectionError(null);

      stompClient.subscribe(`/topic/event/${eventId}`, handleIncomingBet);
    };
    stompClient.onStompError = handleStompError;
    stompClient.activate();
    setClient(stompClient);

    return () => {
      isActive = false;
      stompClient.deactivate();
    };
  }, [eventId, handleIncomingBet, handleStompError]);

  const sendBet = useCallback(
    (content) => {
      if (
        !content?.side ||
        !content?.playerId ||
        !content?.betAmount ||
        !client?.connected ||
        !eventData?.id
      ) {
        return false;
      }
      
      client.publish({
        destination: `/app/event/${eventData.id}`,
        body: JSON.stringify({
          side: content.side,
          playerId: content.playerId,
          points: content.betAmount,
          playerName: content.playerName,
          playerImage: content.playerImage,
          creatorName: sessionEmail,
          action: "CREATE",
        }),
      });

      return true;
    },
    [client, eventData?.id],
  );

  const deleteBet = useCallback(
    (betId) => {
      if (!betId || !client?.connected || !eventData?.id) {
        return false;
      }

      const deletePayload = {
        action: "DELETE",
        id: betId,
        eventId: eventData.id,
        creatorName: sessionEmail,
      };

      client.publish({
        destination: `/app/event/${eventData.id}`,
        body: JSON.stringify(deletePayload),
      });

      return true;
    },
    [client, eventData?.id, sessionEmail],
  );

  const closeEvent = useCallback(async () => {
    if (!eventData?.id) {
      return false;
    }

    await publishCloseEvent(eventData.id, sessionEmail);
    return true;
  }, [eventData?.id, sessionEmail]);

  return {
    eventData,
    bets,
    connectionStatus,
    connectionError,
    sendBet,
    deleteBet,
    closeEvent,
  };
};

export default useEventRoom;
