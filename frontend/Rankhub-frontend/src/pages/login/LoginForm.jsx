import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomLink from "../../components/BottomLink";
import FormInputIcon from "../../components/FormInputIcon";
import SubmitButton from "../../components/SubmitButton";
import { useToast } from "../../context/ToastContext";

import { getUserMessageFromApiError } from "../../services/apiError";
import { login } from "../../services/authApi";
import { setSessionToken } from "../../services/session";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { success: showSuccess, error: showError, warning: showWarning } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    if (normalizedEmail && normalizedPassword) {
      try {
        const response = await login({ email: normalizedEmail, password: normalizedPassword });
        const token = response.data.token;

        setSessionToken(token);

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

  return (
    <form onSubmit={handleSubmit}>
      <FormInputIcon
        label="Correo Electrónico"
        icon="mail"
        type="email"
        placeholder="TU@EMAIL.COM"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormInputIcon
        label="Contraseña"
        icon="lock"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <SubmitButton text="Log In"/>
      <BottomLink firstPart="¿No tienes una cuenta?" secondPart="Regístrate aquí" href="/register" />
    </form>
  );
};

export default LoginForm;
