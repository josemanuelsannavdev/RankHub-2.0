import gatewayApi from "./gatewayApi";

const emptyPayload = {
  queryParams: {},
  body: {},
};

export const getInvitations = (rankingId) => {
  return gatewayApi.post(`/invitation-service/invitation/ranking/${rankingId}`, {
    targetMethod: "GET",
    ...emptyPayload,
  });
}

export const sendInvitation = (rankingId, email) => {
  return gatewayApi.post(`/invitation-service/invitation`, {
    targetMethod: "POST",
    body: { email,rankingId },
    queryParams: {},
  });
}

export const cancelInvitation = (invitationId) => {
  return gatewayApi.post(`/invitation-service/invitation/${invitationId}/cancel`, {
    targetMethod: "PATCH",
    body: {},
    queryParams: {},
  });
}

