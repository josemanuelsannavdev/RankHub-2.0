import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRanking } from "../../../context/RankingContext";
import { useToast } from "../../../context/ToastContext";
import { getUserMessageFromApiError } from "../../../services/apiError";
import { getMyPlayers } from "../../../services/playerApi";

export const useRankingPlayers = () => {
  const { id: rankingId } = useParams();
  const navigate = useNavigate();
  const { currentRanking } = useRanking();
  const { error: showError } = useToast();

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchRankingPlayers = async () => {
      setLoading(true);

      try {
        if (!rankingId) {
          navigate("/mainPage");
          return;
        }

        const response = await getMyPlayers(rankingId);

        if (isMounted) {
          setPlayers(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching ranking players:", error);
        showError(getUserMessageFromApiError(error, "No se pudo cargar el ranking."));
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRankingPlayers();

    return () => {
      isMounted = false;
    };
  }, [navigate, rankingId, showError]);

  const sortedPlayers = useMemo(
    () => [...players].sort((a, b) => (b.points || 0) - (a.points || 0)),
    [players],
  );

  const podiumPlayers = useMemo(() => sortedPlayers.slice(0, 3), [sortedPlayers]);
  const restPlayers = useMemo(() => sortedPlayers.slice(3), [sortedPlayers]);

  const rankingTitle = useMemo(() => {
    const hasMatchingRankingContext = String(currentRanking?.id) === String(rankingId);

    if (hasMatchingRankingContext && currentRanking?.name) {
      return currentRanking.name;
    }

    if (rankingId) {
      return `Ranking ${rankingId}`;
    }

    return "Ranking";
  }, [currentRanking?.id, currentRanking?.name, rankingId]);

  const handlePlayerCreated = useCallback((newPlayer) => {
    setPlayers((currentPlayers) => {
      const withoutDuplicate = currentPlayers.filter(
        (player) => String(player.id) !== String(newPlayer.id),
      );

      return [...withoutDuplicate, newPlayer];
    });
  }, []);

  return {
    loading,
    rankingTitle,
    podiumPlayers,
    restPlayers,
    handlePlayerCreated,
  };
};
