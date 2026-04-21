import BottomLink from "../../components/BottomLink";
import FormInputIcon from "../../components/FormInputIcon";
import SubmitButton from "../../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserMessageFromApiError } from "../../services/apiError";
import { register } from "../../services/authApi";
import {useToast} from "../../context/ToastContext";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
    const { error: showError, success: showSuccess, warning: showWarning } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showError("Las contraseñas no coinciden");
    }
    else if (email && password  && confirmPassword) {
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

      <FormInputIcon
        label="Confirmar Contraseña"
        icon="verified_user"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <SubmitButton text="Register"/>
      <BottomLink firstPart="¿Ya tienes una cuenta?" secondPart="Inicia sesión aquí " href="/login" />
    </form>
  );
};

export default RegisterForm;
