export function parseOAuthResponse(search) {
  try {
    const params = new URLSearchParams(search || window.location.search);
    return {
      token: params.get("token"),
      error: params.get("error"),
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("parseOAuthResponse error:", err);
    return { token: null, error: null };
  }
}

export default parseOAuthResponse;
