/**
 * Validation utilities for game creation forms
 */

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Check if a value is a valid UUID v4
 * @param {string} value - Value to validate
 * @returns {boolean} True if valid UUID
 */
export const isValidUUID = (value) => {
  const trimmedValue = typeof value === "string" ? value.trim() : "";
  return UUID_REGEX.test(trimmedValue);
};

/**
 * Check if a participant is a registered player (has valid UUID)
 * @param {Object} participant - Participant object with id property
 * @returns {boolean} True if is registered player
 */
export const isRegisteredPlayer = (participant) => {
  const id = typeof participant?.id === "string" ? participant.id : "";
  return isValidUUID(id);
};

/**
 * Sanitize guest name
 * @param {string} name - Raw name
 * @returns {string} Cleaned guest name
 */
export const sanitizeGuestName = (name) => {
  return (name || "")
    .trim()
    .replace(/^Invitado:\s*/i, "")
    .trim();
};
