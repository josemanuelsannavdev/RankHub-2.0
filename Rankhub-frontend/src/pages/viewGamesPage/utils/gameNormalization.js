export const splitGameDateTime = (rawDate) => {
  if (typeof rawDate !== "string" || rawDate.trim() === "") {
    return { date: "--", time: "--" };
  }

  const normalizedDate = rawDate.replace("T", " ").trim();
  const [date = "--", time = "--"] = normalizedDate.split(/\s+/);

  return {
    date,
    time: time.length > 5 ? time.slice(0, 5) : time,
  };
};

export const normalizePlayer = (player) => {
  if (!player) {
    return null;
  }

  if (typeof player === "string") {
    return { name: player, image: "" };
  }

  return {
    name: player.name ?? player.username ?? player.fullName ?? "Sin nombre",
    image: player.image ?? player.avatarUrl ?? player.photoUrl ?? "",
  };
};

export const normalizeGame = (game) => {
  const { date, time } = splitGameDateTime(game?.date);
  const duelData = game?.participants ?? game?.duel ?? game?.result ?? {};

  return {
    ...game,
    date,
    time,
    winner: normalizePlayer(
      duelData.winner ?? game?.winner ?? game?.winnerPlayer ?? game?.winnerParticipant,
    ),
    loser: normalizePlayer(
      duelData.loser ?? game?.loser ?? game?.loserPlayer ?? game?.loserParticipant,
    ),
    bet: duelData.bet ?? game?.bet ?? game?.amount ?? null,
  };
};