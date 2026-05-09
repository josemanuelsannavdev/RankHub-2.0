import { useEffect, useState } from "react";
import gatewayApi from "../../../services/gatewayApi";
import { useRanking } from "../../../context/RankingContext";
import { getMyPlayers } from "../../../services/playerApi";

export const CHART_COLORS = [
  "#f9f506", // primary yellow
  "#d1d5db", // secondary gray
  "#cd7f32", // tertiary bronze
  "#22c55e", // winner green
  "#ef4444", // loser red
  "#0F84EB", // blue
  "#65d6a9", // mint
  "#FF7F50", // coral
  "#FF00FF", // magenta
  "#00FFFF", // cyan
  "#590466", // purple
  "#008080", // teal
  "#a19f9f", // gray
  "#ca984d", // brown
  "#b34dca", // morao
  "#b1b448", // olive
];

const getParticipantId = (participant) => participant?.playerId ?? participant?.id;

const buildChartData = (historicos, players) => {
  const labels = historicos.map(
    (historico) => `${historico.gameName} - ${historico.date}`,
  );

  const datasets = players.map((player, index) => {
    const positions = historicos.map((historico) => {
      const sortedPlayers = Array.isArray(historico.players)
        ? [...historico.players].sort(
            (a, b) => (b.totalPoints ?? 0) - (a.totalPoints ?? 0),
          )
        : [];

      const positionIndex = sortedPlayers.findIndex(
        (participant) => String(getParticipantId(participant)) === String(player?.id),
      );

      return positionIndex === -1 ? null : positionIndex + 1;
    });

    return {
      label: player?.name ?? "Jugador",
      data: positions,
      borderColor: CHART_COLORS[index % CHART_COLORS.length],
      backgroundColor: `${CHART_COLORS[index % CHART_COLORS.length]}20`,
      fill: false,
      borderWidth: 2,
      tension: 0.3,
      pointBackgroundColor: CHART_COLORS[index % CHART_COLORS.length],
      pointBorderColor: CHART_COLORS[index % CHART_COLORS.length],
      pointBorderWidth: 2,
    };
  });

  return {
    labels,
    datasets,
  };
};

const useHistoricoChartData = () => {
  const { currentRanking } = useRanking();
  const [historicos, setHistoricos] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const rankingId = currentRanking?.id;

  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
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

        if (!isActive) {
          return;
        }

        setHistoricos(Array.isArray(historicosResponse.data) ? historicosResponse.data : []);
        setPlayers(Array.isArray(playersResponse.data) ? playersResponse.data : []);
      } catch (requestError) {
        if (!isActive) {
          return;
        }

        setError(requestError);
        setHistoricos([]);
        setPlayers([]);
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
  }, [rankingId]);

  return {
    chartData: buildChartData(historicos, players),
    loading,
    error,
    hasData: historicos.length > 0 && players.length > 0,
  };
};

export default useHistoricoChartData;
