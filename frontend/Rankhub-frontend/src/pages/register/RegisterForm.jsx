import BottomLink from "../../components/BottomLink";
import FormInputIcon from "../../components/FormInputIcon";
import SubmitButton from "../../components/SubmitButton";
import { useRegister } from "./hooks/useRegister";

const RegisterForm = () => {
  const {
    handleRegister,
    setEmail,
    setPassword,
    setConfirmPassword,
    confirmPassword,
    email,
    password,
  } = useRegister();

  return (
    <form onSubmit={handleRegister}>
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
      <SubmitButton text="Register" />
      <BottomLink
        firstPart="¿Ya tienes una cuenta?"
        secondPart="Inicia sesión aquí "
        href="/login"
      />
    </form>
  );
};

export default RegisterForm;
