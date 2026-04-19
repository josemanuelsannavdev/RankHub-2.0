export const upsertRanking = (rankings, nextRanking) => {
  const index = rankings.findIndex((ranking) => ranking.id === nextRanking.id);

  if (index === -1) {
    return [...rankings, nextRanking];
  }

  return rankings.map((ranking, currentIndex) =>
    currentIndex === index ? nextRanking : ranking,
  );
};

export const removeRanking = (rankings, rankingId) => {
  return rankings.filter((ranking) => ranking.id !== rankingId);
};

export const groupRankingsByRole = (rankings) => {
  return {
    admin: rankings.filter((ranking) => ranking.role === "ADMIN"),
    subAdmin: rankings.filter((ranking) => ranking.role === "SUB_ADMIN"),
    guest: rankings.filter((ranking) => ranking.role === "GUEST"),
  };
};
