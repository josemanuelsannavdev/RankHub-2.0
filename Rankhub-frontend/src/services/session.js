const TOKEN_KEY = "token";
const EMAIL_KEY = "email";
const AUTH_CHANGED_EVENT = "auth:changed";

const canUseStorage = () => {
  return typeof globalThis !== "undefined" && Boolean(globalThis.localStorage);
};

const safeGet = (key) => {
  if (!canUseStorage()) {
    return null;
  }

  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (key, value) => {
  if (!canUseStorage()) {
    return false;
  }

  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

const safeRemove = (key) => {
  if (!canUseStorage()) {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch {
    // Swallow storage errors to avoid breaking auth flow.
  }
};

export const getSessionToken = () => safeGet(TOKEN_KEY);

export const hasSessionToken = () => Boolean(getSessionToken());

export const setSessionToken = (token) => {
  safeSet(TOKEN_KEY, token);
  globalThis.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export const clearSessionToken = () => {
  safeRemove(TOKEN_KEY);
  safeRemove(EMAIL_KEY);
  globalThis.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export const AUTH_EVENT_NAME = AUTH_CHANGED_EVENT;


export const setSessionEmail = (email) => {
  safeSet(EMAIL_KEY, email);
};

export const clearSessionEmail = () => {
  safeRemove(EMAIL_KEY);
};

export const getSessionEmail = () => safeGet(EMAIL_KEY);