import "../../styles/index.css";
import Filters from "./Filters";
import Header from "../../components/Header";
import Podium from "./Podium";
import RankingList from "./RankingList";
import BottomNav from "../../components/BottomNav";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRanking } from "../../context/RankingContext";
import { useToast } from "../../context/ToastContext";
import { getUserMessageFromApiError } from "../../services/apiError";
import { getRankingPlayers } from "../../services/rankingApi";
import { useRankingPageActions } from "./hooks/useRankingPageActions";
import PlayerFormModal from "./PlayerFormModal";

function RankingPage() {
  const { id: rankingId } = useParams();
  const { currentRanking } = useRanking();
  const [podiumPlayers, setPodiumPlayers] = useState([]);
  const [restPlayers, setRestPlayers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { error: showError } = useToast();


  const {
    modalOpen,
    editingPlayer,
    modalOpenOptions,
    optionPlayer,
    setModalOpen,
    setModalOpenOptions,
    handleCreatePlayerButton,
    handleEditPlayer,
    handlePlayerCreated,
    handlePlayerClick,
    handleOptionPlayer,
    handleDeletePlayer,
  } = useRankingPageActions();

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
        const response = await getRankingPlayers(rankingId);
        const players = response.data || [];
        players.sort((a, b) => b.points - a.points); // Ordenar por puntuación descendente
        setPodiumPlayers(players.slice(0, 3)); // Top 3 para el podio
        setRestPlayers(players.slice(3)); // Resto de jugadores
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
      <BottomNav addPlayerClick={handleOpenAddPlayerModal} />
      {/* Placeholder for Add Player Modal */}
      {modalOpen && (
       <PlayerFormModal playerToEdit={editingPlayer}
          onClose={() => setModalOpen(false)}
          onPlayerCreated={handlePlayerCreated}/>
      )}
    </div>
  );
}

export default RankingPage;
