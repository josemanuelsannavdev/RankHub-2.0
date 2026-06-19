
export const buildDuelParticipantsPayload = (winner, loser, bet) => ({
  winnerId: winner?.id ?? null,
  loserId: loser?.id ?? null,
  bet,
});
