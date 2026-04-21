import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { setSessionToken } from "../../services/session";

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const { success: showSuccess, error: showError } = useToast();
  const hasHandledCallback = useRef(false);

  useEffect(() => {
    if (hasHandledCallback.current) {
      return;
    }
    hasHandledCallback.current = true;

    const searchParams = new URLSearchParams(globalThis.location.search);
    const token = searchParams.get("token");
    const providerError = searchParams.get("error");

    if (token) {
      setSessionToken(token);
      showSuccess("Sesion iniciada correctamente con Google");
      navigate("/mainPage", { replace: true });
      return;
    }
    
    if (providerError) {
      showError("No se pudo iniciar sesion con Google.");
    } else {
      showError("Respuesta OAuth invalida.");
    }

    navigate("/login", { replace: true });
  }, [navigate, showError, showSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-200 text-sm">
      Procesando inicio de sesion con Google...
    </div>
  );
};

export default OAuthCallbackPage;
