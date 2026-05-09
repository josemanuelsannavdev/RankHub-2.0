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

function RankingPage() {
  const navigate = useNavigate();
  const { loading, rankingTitle, podiumPlayers, restPlayers, handlePlayerCreated } =
    useRankingPlayers();
  const { modalOpen, editingPlayer, setModalOpen, handleCreatePlayerButton } =
    useRankingPageActions();

  const handleCreateGame = () => {
    navigate("/createGame");
  };

  const handleViewGames = () => {
    navigate("/viewGames");
  };

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
          <Podium podiumPlayers={podiumPlayers} />
          <RankingList restPlayers={restPlayers} />
        </>
      )}
      <BottomNav
        addPlayerClick={handleCreatePlayerButton}
        createGameClick={handleCreateGame}
        viewGamesClick={handleViewGames}
        viewHistoricoClick={() => navigate("/historico")}
      />
      {/* Placeholder for Add Player Modal */}
      {modalOpen && (
        <PlayerFormModal
          playerToEdit={editingPlayer}
          onClose={() => setModalOpen(false)}
          onPlayerCreated={handlePlayerCreated}
        />
      )}
    </div>
  );
}

export default RankingPage;
