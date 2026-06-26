


const buildMemberPayload = (member) => {
  const memberIdValue =
    typeof member?.id === "string" ? member.id.trim() : "";
  const isGuest =
    member?.role === "Guest" || memberIdValue.startsWith("guest-");

  if (isValidUUID(memberIdValue) && !isGuest) {
    return {
      playerId: memberIdValue,
      guestName: null,
    };
  }

  return {
    playerId: null,
    guestName: member?.name || "Guest",
  };
};


const isValidUUID = (value) => {
  const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return UUID_REGEX.test(value);
};


export const buildTeamsPayload = (teams) => {
  return teams.map((team) => ({
    name: team.name,
    position: team.position,
    points: team.points,
    members: (team.members || []).map(buildMemberPayload),
  }));
};
