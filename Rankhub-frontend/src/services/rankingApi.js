import gatewayApi from "./gatewayApi";

const emptyPayload = {
  queryParams: {},
  body: {},
};

export const getMyRankings = () => {
  return gatewayApi.post("/ranking-service/me/ranking", {
    targetMethod: "GET",
    ...emptyPayload,
  });
};

export const createRanking = (ranking) => {
  return gatewayApi.post("/ranking-service/ranking", {
    targetMethod: "POST",
    ...emptyPayload,
    body: ranking,
  });
};

export const updateRanking = (rankingId, ranking) => {
  return gatewayApi.post(`/ranking-service/ranking/${rankingId}`, {
    targetMethod: "PUT",
    ...emptyPayload,
    body: ranking,
  });
};

export const deleteRanking = (rankingId) => {
  return gatewayApi.post(`/ranking-service/ranking/${rankingId}`, {
    targetMethod: "Delete",
    ...emptyPayload,
  });
};

export const exitRanking = (rankingId) => {
  return gatewayApi.post(`/ranking-service/me/ranking/${rankingId}`, {
    targetMethod: "Delete",
    ...emptyPayload,
  });
};

export const getMembers = (rankingId) => {
  return gatewayApi.post(`/ranking-service/ranking/${rankingId}/members`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
};

export const changeMemberRole = (rankingId, memberEmail) => {
  return gatewayApi.post(
    `/ranking-service/ranking/${rankingId}/member?email=${memberEmail}`,
    {
      targetMethod: "PUT",
      ...emptyPayload,
    },
  );
};

export const deleteMember = (rankingId, memberEmail) => {
  return gatewayApi.post(
    `/ranking-service/ranking/${rankingId}/member?email=${memberEmail}`,
    {
      targetMethod: "DELETE",
      ...emptyPayload,
    },
  );
};
