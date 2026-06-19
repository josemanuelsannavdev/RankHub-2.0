
import { isRegisteredPlayer, sanitizeGuestName } from "./validationUtils";


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


export const buildParticipantsPayload = (participants) => {
  const maxPlayers = participants.length;

  return participants.map((participant, index) =>
    buildParticipantPayload(participant, index + 1, maxPlayers),
  );
};
