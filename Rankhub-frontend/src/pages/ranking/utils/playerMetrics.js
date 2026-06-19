export const getPlayerRate = (gamesPlayed, gamesValue) => {
  if (!gamesPlayed || gamesPlayed <= 0) {
    return "0%";
  }

  return `${Math.round((gamesValue / gamesPlayed) * 100)}%`;
};
