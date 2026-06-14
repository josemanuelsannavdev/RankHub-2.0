import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { setSessionToken } from "../services/session";
import { parseOAuthResponse } from "../utils/oauth";

export function useOAuthCallback() {
  const navigate = useNavigate();
  const { success: showSuccess, error: showError } = useToast();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    try {
      const { token, error } = parseOAuthResponse(globalThis.location.search);

      if (token) {
        setSessionToken(token);
        showSuccess("Sesión iniciada correctamente con Google");
        navigate("/mainPage", { replace: true });
        return;
      }

      if (error) {
        showError("No se pudo iniciar sesión con Google.");
      } else {
        showError("Respuesta OAuth inválida.");
      }

      navigate("/login", { replace: true });
    } catch (err) {
      // Fail-safe: log and redirect to login
      // Keep user-facing messages generic to avoid leaking details
      // while preserving original behavior.
      // eslint-disable-next-line no-console
      console.error("Error procesando callback OAuth:", err);
      showError("Error procesando respuesta OAuth.");
      navigate("/login", { replace: true });
    }
    // navigate/showError/showSuccess are stable from hooks/context,
    // keeping them in deps to satisfy linting and avoid accidental staleness.
  }, [navigate, showError, showSuccess]);
}

export default useOAuthCallback;
