import React from "react";
import { useOAuthCallback } from "../../hooks/useOAuthCallback";

const OAuthCallbackPage = () => {
  useOAuthCallback();

  return (
    <div
      className="min-h-screen flex items-center justify-center text-slate-200 text-sm"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <svg
          className="w-5 h-5 animate-spin text-slate-200"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span>Procesando inicio de sesión con Google…</span>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;
