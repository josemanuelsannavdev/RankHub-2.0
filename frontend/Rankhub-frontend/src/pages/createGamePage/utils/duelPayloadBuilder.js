/**
 * Duel payload builder for duel games
 * Transforms duel objects into API-ready format
 */

/**
 * Build duel participants payload
 * Pure function - transforms winner/loser into API format
 *
 * @param {Object} winner - Winner participant object
 * @param {Object} loser - Loser participant object
 * @param {string} bet - Bet description
 * @returns {Object} Participants payload for API
 */
export const buildDuelParticipantsPayload = (winner, loser, bet) => ({
  winnerId: winner?.id ?? null,
  loserId: loser?.id ?? null,
  bet,
});
