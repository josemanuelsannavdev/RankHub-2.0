/**
 * Participant payload builder for individual games
 * Transforms participant objects into API-ready format
 */

import { isRegisteredPlayer, sanitizeGuestName } from "./validationUtils";

/**
 * Build payload for a single participant
 * Pure function - no side effects
 *
 * @param {Object} participant - Player/guest object
 * @param {number} position - 1-based position in game
 * @param {number} maxPlayers - Total number of players (for points calculation)
 * @returns {Object} Participant payload for API
 */
const buildParticipantPayload = (participant, position, maxPlayers) => {
  const points = Math.max(0, maxPlayers - position);
  const id = typeof participant?.id === "string" ? participant.id.trim() : "";

  if (isRegisteredPlayer({ id })) {
    return {
      playerId: id,
      position,
      points,
    };
  }

  const guestName = sanitizeGuestName(participant?.name || "");
  return {
    guestName: guestName || "Invitado",
    position,
    points,
  };
};

/**
 * Transform participants array into API payload format
 * Pure function - no side effects
 *
 * @param {Array} participants - Array of participant objects
 * @returns {Array} Array of participant payloads
 */
export const buildParticipantsPayload = (participants) => {
  const maxPlayers = participants.length;

  return participants.map((participant, index) =>
    buildParticipantPayload(participant, index + 1, maxPlayers),
  );
};
