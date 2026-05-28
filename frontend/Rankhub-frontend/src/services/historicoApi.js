import gatewayApi from "./gatewayApi";
const emptyPayload = {
  queryParams: {},
  body: {},
};



export const getHistoricos = (rankingId) => {
  return gatewayApi.post(`/ranking-service/historicos/${rankingId}`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
};

export const getHistoricosFromGame = (rankingId, gameId) => {
  return gatewayApi.post(`/ranking-service/historicos/game/${gameId}`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
}

