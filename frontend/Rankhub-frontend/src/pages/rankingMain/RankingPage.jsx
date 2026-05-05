import "../../styles/index.css";
import Filters from "./components/Filters";
import Header from "../../components/Header";
import Podium from "./components/Podium";
import RankingList from "./components/RankingList";
import BottomNav from "../../components/BottomNav";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRanking } from "../../context/RankingContext";
import { useToast } from "../../context/ToastContext";
import { getUserMessageFromApiError } from "../../services/apiError";
import { getMyPlayers } from "../../services/playerApi";
import { useRankingPageActions } from "./hooks/useRankingPageActions";
import PlayerFormModal from "./components/PlayerFormModal";

function RankingPage() {
  const { id: rankingId } = useParams();
  const { currentRanking } = useRanking();
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { error: showError } = useToast();

  const { modalOpen, editingPlayer, setModalOpen, handleCreatePlayerButton } =
    useRankingPageActions();

  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
  const podiumPlayers = sortedPlayers.slice(0, 3);
  const restPlayers = sortedPlayers.slice(3);

  const hasMatchingRankingContext =
    String(currentRanking?.id) === String(rankingId);
  let rankingTitle = "Ranking";

  if (hasMatchingRankingContext && currentRanking?.name) {
    rankingTitle = currentRanking.name;
  } else if (rankingId) {
    rankingTitle = `Ranking ${rankingId}`;
  }

  useEffect(() => {
    const fetchRankingPlayers = async () => {
      setLoading(true);
      try {
        if (!rankingId) {
          navigate("/mainPage");
          return;
        }
        const response = await getMyPlayers(rankingId);
        const players = response.data || [];
        setPlayers(players);
      } catch (error) {
        console.error("Error fetching ranking players:", error);
        showError(
          getUserMessageFromApiError(error, "No se pudo cargar el ranking."),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRankingPlayers();
  }, [rankingId, navigate, showError]);

  const handleOpenAddPlayerModal = () => {
    handleCreatePlayerButton();
  };

  const handlePlayerCreated = (newPlayer) => {
    setPlayers((currentPlayers) => {
      const withoutDuplicate = currentPlayers.filter(
        (player) => String(player.id) !== String(newPlayer.id),
      );

      return [...withoutDuplicate, newPlayer];
    });
  };

  const handleCreateGame = () => {
    navigate(`/createGame`);
  };
const handleViewGames = () => {
    navigate(`/viewGames`);
  };
  return (
    <div className="bg-surface min-h-screen pb-24">

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
        addPlayerClick={handleOpenAddPlayerModal}
        createGameClick={handleCreateGame}
        viewGamesClick={() => handleViewGames()}
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
    </div>
  );
}

export default RankingPage;
