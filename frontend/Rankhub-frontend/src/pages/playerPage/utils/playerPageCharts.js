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

const DUEL_WIN_COLOR = "rgba(34, 197, 94, 0.7)";
const DUEL_WIN_BORDER_COLOR = "rgba(34, 197, 94, 1)";
const DUEL_LOSS_COLOR = "rgba(239, 68, 68, 0.7)";
const DUEL_LOSS_BORDER_COLOR = "rgba(239, 68, 68, 1)";

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

const buildPositionCounts = (historicos, playerId) => {
  const validHistoricos = Array.isArray(historicos) ? historicos : [];
  const numJugadores =
    validHistoricos.length > 0
      ? Math.max(
          ...validHistoricos.map((historico) =>
            Array.isArray(historico.players) ? historico.players.length : 0,
          ),
        )
      : 0;

  const posiciones = new Array(numJugadores).fill(0);

  for (const historico of validHistoricos) {
    if (historico?.type === "DUEL_GAME" || !Array.isArray(historico?.players)) {
      continue;
    }

    const playerInGame = historico.players.find(
      (participant) => participant.playerId === playerId,
    );
    const position = playerInGame?.position;

    if (typeof position === "number" && position >= 1 && position <= numJugadores) {
      posiciones[position - 1] += 1;
    }
  }

  return { numJugadores, posiciones };
};

export const buildPositionChartModel = ({ historicos, playerId }) => {
  const { numJugadores, posiciones } = buildPositionCounts(historicos, playerId);
  const labels = Array.from(
    { length: numJugadores },
    (_, index) => `Posición ${index + 1}`,
  );
  const extraBarsCount = Math.max(posiciones.length - POSITION_BAR_COLORS.length, 0);

  return {
    data: {
      labels,
      datasets: [
        {
          label: "Veces en esa posición",
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

const extractDuelParticipants = (historico, currentPlayerId) => {
  if (historico?.type !== "DUEL_GAME" || !Array.isArray(historico?.players)) {
    return null;
  }

  const playerInDuel = historico.players.find(
    (participant) => participant.playerId === currentPlayerId,
  );

  if (!playerInDuel) {
    return null;
  }

  const winner = historico.players.find((participant) => participant.obtainedPoints > 0);
  const loser = historico.players.find((participant) => participant.obtainedPoints < 0);

  if (!winner || !loser) {
    return null;
  }

  const isPlayerWinner = winner.playerId === currentPlayerId;
  const opponentName = isPlayerWinner ? loser.playerName : winner.playerName;

  return {
    isPlayerWinner,
    opponentName: opponentName || "Desconocido",
  };
};

const updateOpponentRecord = (opponents, opponentName, isWin) => {
  const existingOpponent = opponents.find(
    (opponent) => opponent.nombre === opponentName,
  );

  if (existingOpponent) {
    if (isWin) {
      existingOpponent.ganadas += 1;
    } else {
      existingOpponent.perdidas += 1;
    }

    return;
  }

  opponents.push({
    nombre: opponentName,
    ganadas: isWin ? 1 : 0,
    perdidas: isWin ? 0 : 1,
  });
};

const buildOpponentRecords = (historicos, currentPlayerId) => {
  const opponents = [];
  const duelHistoricos = Array.isArray(historicos)
    ? historicos.filter((historico) => historico?.type === "DUEL_GAME")
    : [];

  for (const historico of duelHistoricos) {
    const duelData = extractDuelParticipants(historico, currentPlayerId);
    if (duelData) {
      updateOpponentRecord(opponents, duelData.opponentName, duelData.isPlayerWinner);
    }
  }

  return opponents;
};

export const buildDuelChartModel = ({ historicos, playerId }) => {
  const opponents = buildOpponentRecords(historicos, playerId);

  if (opponents.length === 0) {
    return null;
  }

  const labels = opponents.map((opponent) => opponent.nombre);
  const wins = opponents.map((opponent) => opponent.ganadas);
  const losses = opponents.map((opponent) => opponent.perdidas);

  const totalDueles = opponents.reduce(
    (accumulator, opponent) => accumulator + opponent.ganadas + opponent.perdidas,
    0,
  );
  const ganadosTotales = opponents.reduce(
    (accumulator, opponent) => accumulator + opponent.ganadas,
    0,
  );
  const perdidosTotales = opponents.reduce(
    (accumulator, opponent) => accumulator + opponent.perdidas,
    0,
  );

  return {
    data: {
      labels,
      datasets: [
        {
          label: "Duelos ganados",
          data: wins,
          backgroundColor: DUEL_WIN_COLOR,
          borderColor: DUEL_WIN_BORDER_COLOR,
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: "Duelos perdidos",
          data: losses,
          backgroundColor: DUEL_LOSS_COLOR,
          borderColor: DUEL_LOSS_BORDER_COLOR,
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    },
    options: createStandardBarChartOptions(),
    stats: {
      totalDueles,
      ganadosTotales,
      perdidosTotales,
    },
  };
};