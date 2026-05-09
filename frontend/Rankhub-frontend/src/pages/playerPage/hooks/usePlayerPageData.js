import { useEffect, useState } from "react";
import gatewayApi from "../../../services/gatewayApi";
import { getPlayer } from "../../../services/playerApi";

const EMPTY_HISTORY = [];

const usePlayerPageData = ({ playerId, currentRankingId }) => {
  const [player, setPlayer] = useState(null);
  const [historicos, setHistoricos] = useState(EMPTY_HISTORY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playerId) {
      setPlayer(null);
      setHistoricos(EMPTY_HISTORY);
      setLoading(false);
      setError("No se encontró el jugador.");
      return;
    }

    let isActive = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const requests = [getPlayer(playerId)];

        if (currentRankingId) {
          requests.push(
            gatewayApi.post(`/ranking-service/historicos/${currentRankingId}`, {
              targetMethod: "GET",
              queryParams: {},
              body: {},
            }),
          );
        }

        const [playerResponse, historicosResponse] = await Promise.all(requests);

        if (!isActive) {
          return;
        }

        setPlayer(playerResponse.data);
        setHistoricos(
          Array.isArray(historicosResponse?.data) ? historicosResponse.data : [],
        );
      } catch (requestError) {
        if (!isActive) {
          return;
        }

        console.error("Error fetching player data:", requestError);
        setPlayer(null);
        setHistoricos(EMPTY_HISTORY);
        setError(
          requestError?.message || "No se pudieron cargar los datos del jugador.",
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
  }, [playerId, currentRankingId]);

  return {
    player,
    historicos,
    loading,
    error,
  };
};

export default usePlayerPageData;