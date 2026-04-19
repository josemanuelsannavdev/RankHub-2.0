import LoginRegisterLayout from "../../layouts/LoginRegisterLayout";
import FormHeader from "../../components/FormHeader";
import LoginRegisterCard from "../../components/LoginRegisterCard";
import RegisterForm from "./RegisterForm";
const RegisterPage = () => {
  return (
    <LoginRegisterLayout>
      <FormHeader titleFirstWord="Crear Cuenta" titleSecondWord="ahora" subTitle="Crea tu cuenta para comenzar" />
      <LoginRegisterCard>
        <RegisterForm />
      </LoginRegisterCard>
    </LoginRegisterLayout>
  );
};

export default RegisterPage;
