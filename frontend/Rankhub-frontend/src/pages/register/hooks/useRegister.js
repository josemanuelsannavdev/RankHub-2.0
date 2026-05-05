import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";
import { register } from "../../../services/authApi";

import { getUserMessageFromApiError } from "../../../services/apiError";

export const useRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const {
    error: showError,
    success: showSuccess,
    warning: showWarning,
  } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showError("Las contraseñas no coinciden");
    } else if (email && password && confirmPassword) {
      try {
        await register({
          email: email.trim(),
          password,
        });
        showSuccess("Registro exitoso. Por favor, inicia sesión.");
        navigate("/login");
      } catch (error) {
        console.error("Error en register:", error);
        showError(getUserMessageFromApiError(error, "Error en el registro."));
      }
    } else {
      showWarning("Por favor, completa todos los campos.");
    }
  };

  return {
    handleRegister,
    setEmail,
    setPassword,
    setConfirmPassword,
    confirmPassword,
    email,
    password,
  };
};
