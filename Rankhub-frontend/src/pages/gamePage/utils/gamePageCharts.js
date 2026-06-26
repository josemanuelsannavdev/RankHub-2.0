const POSITION_BAR_COLORS = [
  "rgba(249, 245, 6, 0.8)",
  "rgba(209, 213, 219, 0.8)",
  "rgba(205, 127, 50, 0.8)",
];

const POSITION_BORDER_COLORS = [
  "rgba(249, 245, 6, 0.3)",
  "rgba(209, 213, 219, 0.3)",
  "rgba(205, 127, 50, 0.3)",
];

const createStandardBarChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        usePointStyle: true,
        pointStyle: "rect",
        padding: 16,
        font: {
          size: 13,
        },
      },
    },
  },
});

const buildPositionCounts = (historicos, gameId) => {
  const validHistoricos = Array.isArray(historicos) ? historicos : [];


  const allPlayers = validHistoricos
    .flatMap((h) => h.players || [])
    .reduce((acc, player) => {
      if (!acc[player.playerId]) {
        acc[player.playerId] = [];
      }

      acc[player.playerId].push(player);

      return acc;
    }, {});
  const filteredPlayersGrouped = Object.fromEntries(
    Object.entries(allPlayers).filter(([_, games]) =>
      games.some((game) => game.obtainedPoints !== null),
    ),
  );


  const numJugadores = Object.keys(filteredPlayersGrouped).length;

  const posiciones = new Array(numJugadores).fill(0);


  const puntosPorJugador = Object.entries(filteredPlayersGrouped).map(
    ([playerId, games]) => ({
      playerId,
      playerName: games[0].playerName,
      puntos: games.reduce(
        (total, game) => total + (game.obtainedPoints ?? 0),
        0,
      ),
    }),
  );

  puntosPorJugador.sort((a, b) => b.puntos - a.puntos);
  const playersNames = puntosPorJugador.map((p) => p.playerName);

  puntosPorJugador.forEach((p, index) => {
    posiciones[index] = p.puntos;
  });
  return { numJugadores, playersNames, posiciones };
};

export const buildPositionChartModel = ({ historicos, playerId }) => {
  const { numJugadores,playersNames, posiciones } = buildPositionCounts(
    historicos,
    playerId,
  );
  const labels = Array.from(
    { length: numJugadores },
    (_, index) => `${playersNames[index] || "Player " + (index + 1)}`,
  );
  const extraBarsCount = Math.max(
    posiciones.length - POSITION_BAR_COLORS.length,
    0,
  );

  return {
    data: {
      labels,
      datasets: [
        {
          label: "Total points",
          data: posiciones,
          borderColor: [
            ...POSITION_BORDER_COLORS,
            ...new Array(extraBarsCount).fill("rgba(75, 192, 192, 0.3)"),
          ],
          backgroundColor: [
            ...POSITION_BAR_COLORS,
            ...new Array(extraBarsCount).fill("rgba(75, 192, 192, 0.8)"),
          ],
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    },
    options: createStandardBarChartOptions(),
  };
};
