import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomLink from "../../components/BottomLink";
import FormInputIcon from "../../components/FormInputIcon";
import SubmitButton from "../../components/SubmitButton";

import gatewayApi from "../../services/gatewayApi";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await gatewayApi.post("/auth-service/auth/login", {
          targetMethod: "POST",
          queryParams: {},
          body: { email: email, password: password },
        });
        const token = response.data.token;

        localStorage.setItem("token", token);

        navigate("/mainPage");
      } catch (error) {
        console.error("Error en login:", error);
        alert("Error en el login. Verifica tus credenciales.");
      }
    } else {
      alert("Por favor, completa todos los campos.");
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
