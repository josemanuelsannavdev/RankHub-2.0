import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import useEventRoom from "./hooks/useEventRoom";
import EventCard from "./EventCard";
import BetFormModal from "./BetFormModal";
import { useRanking } from "../../context/RankingContext";
import { getMyPlayers } from "../../services/playerApi";
import BottomNavOneButton from "../../components/BottomNavOneButton";
import BetCard from "./components/BetCard";
import { getSessionEmail } from "../../services/session";
function EventPage() {
  const { eventId: routeEventId } = useParams();
  const [betModalOpen, setBetModalOpen] = useState(false);
  const {
    eventData,
    bets,
    connectionStatus,
    connectionError,
    sendBet,
    deleteBet,
    closeEvent,
  } = useEventRoom({ eventId: routeEventId });
  const { currentRanking } = useRanking();
  const [rankingPlayers, setRankingPlayers] = useState([]);

  useEffect(() => {
    // 2. Only fetch if currentRanking and its id exist
    if (currentRanking?.id) {
      getMyPlayers(currentRanking.id)
        .then((response) => {
          // 3. Extract the array and set it to state
          const playersArray = response.data || [];
          setRankingPlayers(playersArray);
        })
        .catch((error) => {
          console.error("Failed to fetch players:", error);
        })
        .finally(() => {});
    }
  }, [currentRanking?.id]);

  const handleBetModalOpen = () => {
    setBetModalOpen(true);
  };

  const handleBetModalClose = () => {
    setBetModalOpen(false);
  };

  const handleCloseEvent = async () => {
    const wasSent = await closeEvent();

    return wasSent;
  };

  const handleBetSubmit = (betPayload) => {
    const wasSent = sendBet(betPayload);

    if (wasSent !== false) {
      handleBetModalClose();
    }

    return wasSent;
  };
  return (
    <div className="bg-surface min-h-screen pb-24" aria-live="polite">
      <Header title="Event Page" />
      {/* Add your event page content here */}
      <main className="pt-24 px-6 max-w-4xl mx-auto">
        {eventData?.creatorName === getSessionEmail() && (
          <button className="mb-4 px-4 py-2 bg-primary text-black rounded hover:scale-105 transition-colors"
            type="button"
            onClick={handleCloseEvent}
          >
            Close Event
          </button>
        )}
        {eventData ? (
          <EventCard event={eventData} />
        ) : (
          <p>Cargando datos del evento...</p>
        )}

        <section className="mt-6 space-y-4">
          <div className="flex items-center gap-3 px-1">
            <div className="w-4 h-8 bg-primary  rounded-full"></div>
            <h2 className="text-xl font-black uppercase tracking-widest text-primary neon-glow-blue">
              BETS
            </h2>
          </div>
          {bets.map((bet) =>
            bet.sideId === eventData.blueSide.id ? (
              <BetCard key={bet.id} bet={bet} side="blueSide" onDelete={deleteBet} />
            ) : bet.sideId === eventData.redSide.id ? (
              <BetCard key={bet.id} bet={bet} side="redSide" onDelete={deleteBet} />
            ) : null,
          )}
        </section>
        <BottomNavOneButton
          onClick={handleBetModalOpen}
          buttonTitle="Create bet"
        />
      </main>

      {betModalOpen && (
        <BetFormModal
          onClose={handleBetModalClose}
          onSubmit={handleBetSubmit}
          playersBet={rankingPlayers}
        />
      )}
    </div>
  );
}

export default EventPage;
