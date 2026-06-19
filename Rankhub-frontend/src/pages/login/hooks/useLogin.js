import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";

import { getUserMessageFromApiError } from "../../../services/apiError";
import { login,getGoogleAuthorizationUrl } from "../../../services/authApi";
import { setSessionToken ,setSessionEmail} from "../../../services/session";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {
    success: showSuccess,
    error: showError,
    warning: showWarning,
  } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    if (normalizedEmail && normalizedPassword) {
      try {
        const response = await login({
          email: normalizedEmail,
          password: normalizedPassword,
        });
        const token = response.data.token;
        
        setSessionToken(token);
        setSessionEmail(normalizedEmail);
        
        showSuccess("Sesión iniciada correctamente");
        navigate("/mainPage");
      } catch (err) {
        console.error("Error en login:", err);
        showError(getUserMessageFromApiError(err, "Error en el login."));
      }
    } else {
      showWarning("Por favor, completa todos los campos.");
    }
  };

const handleGoogleLogin = async () => {
    try {
      const response = await getGoogleAuthorizationUrl();
      const oauthPath = response?.data?.authorizationUrl;
      if (!oauthPath) {
        throw new Error("OAuth authorization URL not found");
      }

      const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8762";
      const authorizationUrl = new URL(`/auth-service${oauthPath}`, baseUrl).toString();
      globalThis.location.assign(authorizationUrl);
    } catch (error) {
      console.error("Error al iniciar OAuth con Google:", error);
      showError("No se pudo iniciar sesión con Google.");
    }
  };

  return {
    handleLogin,
    handleGoogleLogin,
    setEmail,
    setPassword,
    email,
    password
  };
};
