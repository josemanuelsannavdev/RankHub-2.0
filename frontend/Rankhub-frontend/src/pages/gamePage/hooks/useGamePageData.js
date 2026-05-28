import { useEffect, useState } from "react";
import gatewayApi from "../../../services/gatewayApi";
import { getGame } from "../../../services/gameApi";
import { getHistoricosFromGame } from "../../../services/historicoApi";
const EMPTY_HISTORY = [];

const useGamePageData = ({ gameId, currentRankingId }) => {
  const [game, setGame] = useState(null);
  const [historicos, setHistoricos] = useState(EMPTY_HISTORY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) {
      setGame(null);
      setHistoricos(EMPTY_HISTORY);
      setLoading(false);
      setError("No se encontró el juego.");
      return;
    }

    let isActive = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const requests = [getGame(gameId)];

        if (currentRankingId) {
          requests.push(
            getHistoricosFromGame(currentRankingId, gameId)
          );
        }

        const [gameResponse, historicosResponse] = await Promise.all(requests);

        if (!isActive) {
          return;
        }
        setGame(gameResponse.data);
        setHistoricos(historicosResponse?.data || []);
      } catch (requestError) {
        if (!isActive) {
          return;
        }

        console.error("Error fetching game data:", requestError);
        setGame(null);
        setHistoricos(EMPTY_HISTORY);
        setError(
          requestError?.message || "No se pudieron cargar los datos del juego.",
        );
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isActive = false;
    };
  }, [gameId, currentRankingId]);

  return {
    game,
    setGame,
    historicos,
    loading,
    error,
  };
};

export default useGamePageData;
