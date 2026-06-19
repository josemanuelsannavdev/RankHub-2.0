
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;


export const isValidUUID = (value) => {
  const trimmedValue = typeof value === "string" ? value.trim() : "";
  return UUID_REGEX.test(trimmedValue);
};


export const isRegisteredPlayer = (participant) => {
  const id = typeof participant?.id === "string" ? participant.id : "";
  return isValidUUID(id);
};


export const sanitizeGuestName = (name) => {
  return (name || "")
    .trim()
    .replace(/^Invitado:\s*/i, "")
    .trim();
};
