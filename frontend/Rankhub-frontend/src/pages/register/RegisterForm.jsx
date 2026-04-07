import BottomLink from "./BottomLink";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

const RegisterForm = () => {
  return (
    <>
      <FormInput
        label="Nombre Completo"
        icon="person"
        placeholder="EJ. ALEX HUNTER"
      />

      <FormInput
        label="Correo Electrónico"
        icon="mail"
        type="email"
        placeholder="TU@EMAIL.COM"
      />

      <FormInput
        label="Contraseña"
        icon="lock"
        type="password"
        placeholder="••••••••"
      />

      <FormInput
        label="Confirmar Contraseña"
        icon="verified_user"
        type="password"
        placeholder="••••••••"
      />
      <SubmitButton></SubmitButton>
      <BottomLink></BottomLink>
    </>
  );
};

export default RegisterForm;
