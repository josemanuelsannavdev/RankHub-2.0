import gatewayApi from "./gatewayApi";
const emptyPayload = {
  queryParams: {},
  body: {},
};



export const getGameNames = (rankingId) => {
  return gatewayApi.post(`/ranking-service/gameName/${rankingId}`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
};

export const createGameName = (gameData) => {
  return gatewayApi.post(`/ranking-service/gameName`, {
    targetMethod: "POST",
    body: gameData,
    queryParams: {},});
};


export const createIndividualGame = (gameData) => {
  return gatewayApi.post(`/ranking-service/game/individual`, {
    targetMethod: "POST",
    body: gameData,
    queryParams: {},});
};

export const createTeamGame = (gameData) => {
  return gatewayApi.post(`/ranking-service/game/team`, {
    targetMethod: "POST",
    body: gameData,
    queryParams: {},});
};

export const createDuelGame = (gameData) => {
  return gatewayApi.post(`/ranking-service/game/duel`, {
    targetMethod: "POST",
    body: gameData,
    queryParams: {},});
};

export const getGames = (rankingId) => {
  return gatewayApi.post(`/ranking-service/games/${rankingId}`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
};

export const getGame = (gameId) => {
  return gatewayApi.post(`/ranking-service/game/${gameId}`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
};

export const deleteGame = (gameId) => {
  return gatewayApi.post(`/ranking-service/game/${gameId}`, {
    targetMethod: "DELETE",
    ...emptyPayload,
  });
} ;