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

export const getPlayer = (playerId) => {
  return gatewayApi.post(`/ranking-service/player/${playerId}`, {
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
  return gatewayApi.post(`/ranking-service/player/${playerId}`, {
    targetMethod: "PUT",
    ...emptyPayload,
    body: player,
  });
};
