import LoginRegisterLayout from "../../layouts/LoginRegisterLayout";
import FormHeader from "../../components/FormHeader";
import LoginRegisterCard from "../../components/LoginRegisterCard";
import RegisterForm from "./RegisterForm";
const RegisterPage = () => {
  return (
    <LoginRegisterLayout>
      <FormHeader title="Crear Cuenta" />
      <LoginRegisterCard>
        <RegisterForm />
      </LoginRegisterCard>
    </LoginRegisterLayout>
  );
};

export default RegisterPage;
