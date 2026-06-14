import "../../styles/index.css";
import Filters from "./components/Filters";
import Header from "../../components/Header";
import Podium from "./components/Podium";
import RankingList from "./components/RankingList";
import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useRankingPageActions } from "./hooks/useRankingPageActions";
import { useRankingPlayers } from "./hooks/useRankingPlayers";
import PlayerFormModal from "./components/PlayerFormModal";
import ChatButton from "./components/ChatButton";
import { useState } from "react";
import ChatModal from "../chat/ChatModal";

function RankingPage() {
  const navigate = useNavigate();
  const {
    loading,
    rankingTitle,
    podiumPlayers,
    restPlayers,
    handlePlayerCreated,
  } = useRankingPlayers();
  const { modalOpen, editingPlayer, setModalOpen, handleCreatePlayerButton } =
    useRankingPageActions();
  const [modalChatOpen, setModalChatOpen] = useState(false);

  const handleCreateGame = () => {
    navigate("/createGame");
  };

  const handleViewGames = () => {
    navigate("/viewGames");
  };

  const handleViewHistorico = () => {
    navigate("/historico");
  };

  const handleChatButtonClick = () => {
    setModalChatOpen(true);
  };

  const handleViewBets = () => {
    navigate("/viewEventsPage");
  }
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white">
      <Header title={rankingTitle} />
      {loading ? (
        <div className="flex items-center justify-center mt-20">
          <p className="text-gray-600">Cargando ranking...</p>
        </div>
      ) : (
        <>
          <Filters />
          <ChatButton OnClick={handleChatButtonClick} />
          <Podium podiumPlayers={podiumPlayers} />
          <RankingList restPlayers={restPlayers} />
        </>
      )}
      <BottomNav
        addPlayerClick={handleCreatePlayerButton}
        createGameClick={handleCreateGame}
        viewGamesClick={handleViewGames}
        viewHistoricoClick={handleViewHistorico}
        viewBetsClick={handleViewBets}
      />
      {/* Placeholder for Add Player Modal */}
      {modalOpen && (
        <PlayerFormModal
          playerToEdit={editingPlayer}
          onClose={() => setModalOpen(false)}
          onPlayerCreated={handlePlayerCreated}
        />
      )}
      {/* Placeholder for Chat Modal */}
      {modalChatOpen && (
        <ChatModal
          isOpen={modalChatOpen}
          onClose={() => setModalChatOpen(false)}
        />
      )}
    </div>
  );
}

export default RankingPage;
