import gatewayApi from "./gatewayApi";

export const getGameNames = (rankingId) => {
  return gatewayApi.post(`/ranking-service/ranking/players/${rankingId}`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
};