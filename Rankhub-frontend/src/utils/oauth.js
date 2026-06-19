export function parseOAuthResponse(search) {
  try {
    const params = new URLSearchParams(search || globalThis.location.search);
    return {
      token: params.get("token"),
      email: params.get("email"),
      error: params.get("error"),
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("parseOAuthResponse error:", err);
    return { token: null, email: null, error: null };
  }
}

export function extractEmailFromJwt(token) {
  if (!token || typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  try {
    const payload = parts[1].replaceAll("-", "+").replaceAll("_", "/");
    const paddedPayload = payload.padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const decodedPayload = globalThis.atob(paddedPayload);
    const parsedPayload = JSON.parse(decodedPayload);

    return parsedPayload.email ?? parsedPayload.preferred_username ?? parsedPayload.upn ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("extractEmailFromJwt error:", err);
    return null;
  }
}

export default parseOAuthResponse;
