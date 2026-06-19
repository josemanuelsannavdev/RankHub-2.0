import { useCallback, useEffect, useState } from "react";
import { finishEvent, getEvents } from "../../../services/betApi";
import { useRanking } from "../../../context/RankingContext";

export const useEvent = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [finishedEvents, setFinishedEvents] = useState([]);
  const [closedEvents, setClosedEvents] = useState([]);
  const { currentRanking } = useRanking();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!currentRanking?.id) {
        return;
      }
      const eventsData = (await getEvents(currentRanking.id)).data;
      const current = eventsData.filter((event) => event.status === "PENDING");
      const finished = eventsData.filter(
        (event) => event.status === "FINISHED",
      );
      const closed = eventsData.filter((event) => event.status === "CLOSED");

      setCurrentEvents(current);
      setFinishedEvents(finished);
      setClosedEvents(closed);
    };

    fetchEvents();
  }, [currentRanking?.id]);

  const handleFinishEvent = useCallback(async (eventToFinish, winnerSideId) => {
    if (!eventToFinish?.id) {
      return false;
    }

    await finishEvent(eventToFinish.id, winnerSideId);

    const finishedEvent = {
      ...eventToFinish,
      status: "FINISHED",
      winnerSideId,
    };

    setClosedEvents((previousClosedEvents) =>
      previousClosedEvents.filter((event) => event.id !== eventToFinish.id),
    );
    setFinishedEvents((previousFinishedEvents) => {
      const withoutCurrentEvent = previousFinishedEvents.filter(
        (event) => event.id !== eventToFinish.id,
      );

      return [...withoutCurrentEvent, finishedEvent];
    });

    return true;
  }, []);

  return {
    currentEvents,
    finishedEvents,
    closedEvents,
    handleFinishEvent,
  };
};
