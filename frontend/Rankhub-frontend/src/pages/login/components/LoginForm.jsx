import BottomLink from "../../../components/BottomLink";
import FormInputIcon from "../../../components/FormInputIcon";
import SubmitButton from "../../../components/SubmitButton";

import {useLogin} from "../hooks/useLogin"

const LoginForm = () => {


  const { handleLogin,
    setEmail,
    setPassword,
    email,
    password} = useLogin();

  return (
    <form onSubmit={handleLogin}>
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
