import BottomLink from "./BottomLink";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

const LoginForm = () => {
  return (
    <>
      

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

      
      <SubmitButton></SubmitButton>
      <BottomLink></BottomLink>
    </>
  );
};

export default LoginForm;
