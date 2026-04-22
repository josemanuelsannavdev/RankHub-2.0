import gatewayApi from "./gatewayApi";

const emptyPayload = {
  queryParams: {},
  body: {},
};

export const getMyPlayers = (rankingId) => {
  return gatewayApi.post(`/ranking-service/ranking/players/${rankingId}`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
};

export const createPlayer = (player) => {
  return gatewayApi.post("/ranking-service/player", {
    targetMethod: "POST",
    ...emptyPayload,
    body: player,
  });
};

export const updatePlayer = (playerId, player) => {
  return gatewayApi.post(`/ranking-service/jugador/${playerId}`, {
    targetMethod: "PUT",
    ...emptyPayload,
    body: player,
  });
};
