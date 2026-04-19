import gatewayApi from "./gatewayApi";

const emptyPayload = {
  queryParams: {},
  body: {},
};

export const login = ({ email, password }) => {
  return gatewayApi.post("/auth-service/auth/login", {
    targetMethod: "POST",
    ...emptyPayload,
    body: { email, password },
  });
};

export const register = ({ name, email, password }) => {
  return gatewayApi.post("/auth-service/auth/register", {
    targetMethod: "POST",
    ...emptyPayload,
    body: { name, email, password },
  });
};