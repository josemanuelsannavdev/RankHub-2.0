import BottomLink from "../../components/BottomLink";
import FormInputIcon from "../../components/FormInputIcon";
import SubmitButton from "../../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import gatewayApi from "../../services/gatewayApi";
import {useToast} from "../../context/ToastContext";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const {success,warning,error} = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      error("Las contraseñas no coinciden");
    }
    else if (email && password && name && confirmPassword) {
      try {
        await gatewayApi.post("/auth-service/auth/register", {
          targetMethod: "POST",
          queryParams: {},
          body: { email: email, password: password},
        });
        navigate("/login");
      } catch (error) {
        console.error("Error en register:", error);
        error("Error en el registro. Verifica los campos.");
      }
    } else {
      error("Por favor, completa todos los campos.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInputIcon
        label="Nombre Completo"
        icon="person"
        type="text"
        placeholder="EJ. ALEX HUNTER"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
