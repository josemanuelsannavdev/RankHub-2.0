import gatewayApi from "./gatewayApi";

const emptyPayload = {
  queryParams: {},
  body: {},
};

export const login = ({ email, password }) => {
  return gatewayApi.post("/auth-service/auth/login", {
    targetMethod: "POST",
    ...emptyPayload,
    body: { "email": email, "password": password },
  });
};

export const register = ({email, password }) => {
  return gatewayApi.post("/auth-service/auth/register", {
    targetMethod: "POST",
    ...emptyPayload,
    body: { "email": email, "password": password },
  });
};

export const getGoogleAuthorizationUrl = () => {
  return gatewayApi.post("/auth-service/auth/google",{
    targetMethod: "GET",
    ...emptyPayload,
  });
};