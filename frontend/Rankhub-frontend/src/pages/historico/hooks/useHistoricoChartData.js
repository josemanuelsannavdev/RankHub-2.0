import { useEffect, useState, useCallback } from "react";
import gatewayApi from "../../../services/gatewayApi";
import { useRanking } from "../../../context/RankingContext";
import { getMyPlayers } from "../../../services/playerApi";
import { buildChartData } from "../utils/chartDataBuilder";


const useHistoricoChartData = () => {
  const { currentRanking } = useRanking();
  const [historicos, setHistoricos] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const rankingId = currentRanking?.id;

  /**
   * Fetch both historicos and players in parallel
   * Memoized to prevent unnecessary recreation
   */
  const fetchData = useCallback(async () => {
    if (!rankingId) {
      setHistoricos([]);
      setPlayers([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [historicosResponse, playersResponse] = await Promise.all([
        gatewayApi.post(`/ranking-service/historicos/${rankingId}`, {
          targetMethod: "GET",
          queryParams: {},
          body: {},
        }),
        getMyPlayers(rankingId),
      ]);

      setHistoricos(Array.isArray(historicosResponse.data) ? historicosResponse.data : []);
      setPlayers(Array.isArray(playersResponse.data) ? playersResponse.data : []);
    } catch (requestError) {
      setError(requestError);
      setHistoricos([]);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  }, [rankingId]);

  /**
   * Setup effect with cleanup to prevent memory leaks
   * Triggers fetch when rankingId changes
   */
  useEffect(() => {
    let isActive = true;

    (async () => {
      await fetchData();
      // Additional cleanup check could be added here if needed
      if (!isActive) return;
    })();

    return () => {
      isActive = false;
    };
  }, [rankingId, fetchData]);

  return {
    chartData: buildChartData(historicos, players),
    loading,
    error,
    hasData: historicos.length > 0 && players.length > 0,
  };
};

export default useHistoricoChartData;
