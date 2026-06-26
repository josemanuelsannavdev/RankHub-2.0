import { CHART_COLORS } from "./chartConfig";

const getParticipantId = (participant) =>
  participant?.playerId ?? participant?.id;

const buildPlayerDataset = (player, historicos, colorIndex) => {
  const positions = historicos.map((historico) => {
    const sortedPlayers = Array.isArray(historico.players)
      ? historico.players.toSorted(
          (a, b) => (b.totalPoints ?? 0) - (a.totalPoints ?? 0),
        )
      : [];

    const positionIndex = sortedPlayers.findIndex(
      (participant) =>
        String(getParticipantId(participant)) === String(player?.id),
    );

    return positionIndex === -1 ? null : positionIndex + 1;
  });

  const color = CHART_COLORS[colorIndex % CHART_COLORS.length];

  return {
    label: player?.name ?? "Player",
    data: positions,
    borderColor: color,
    backgroundColor: `${color}20`,
    fill: false,
    borderWidth: 2,
    tension: 0,
    pointBackgroundColor: color,
    pointBorderColor: color,
    pointBorderWidth: 2,
  };
};

export const buildChartData = (historicos, players) => {
  const labels = historicos.map(
    (historico) => `${historico.gameName} - ${historico.date.split("T")[0]}`,
  );

  const datasets = players.map((player, index) =>
    buildPlayerDataset(player, historicos, index),
  );

  return {
    labels,
    datasets,
  };
};

