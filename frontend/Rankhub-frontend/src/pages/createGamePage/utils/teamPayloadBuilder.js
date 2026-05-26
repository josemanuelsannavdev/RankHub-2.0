/**
 * Team payload builder for team games
 * Transforms team objects into API-ready format
 */

import { isRegisteredPlayer } from "./validationUtils";

/**
 * Build member payload for a single team member
 * @param {Object} member - Team member object
 * @returns {Object} Member payload with playerId or guestName
 */
const buildMemberPayload = (member) => {
  const memberIdValue =
    typeof member?.id === "string" ? member.id.trim() : "";
  const isGuest =
    member?.role === "Invitado" || memberIdValue.startsWith("guest-");

  if (isValidUUID(memberIdValue) && !isGuest) {
    return {
      playerId: memberIdValue,
      guestName: null,
    };
  }

  return {
    playerId: null,
    guestName: member?.name || "Invitado",
  };
};

/**
 * Check if a value is a valid UUID
 * @param {string} value - Value to check
 * @returns {boolean} True if valid UUID
 */
const isValidUUID = (value) => {
  const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return UUID_REGEX.test(value);
};

/**
 * Transform teams array into API payload format
 * Pure function - no side effects
 *
 * @param {Array} teams - Array of team objects
 * @returns {Array} Array of team payloads
 */
export const buildTeamsPayload = (teams) => {
  return teams.map((team) => ({
    name: team.name,
    position: team.position,
    points: team.points,
    members: (team.members || []).map(buildMemberPayload),
  }));
};
