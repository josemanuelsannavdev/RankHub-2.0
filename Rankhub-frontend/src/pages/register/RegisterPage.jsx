import LoginRegisterLayout from "../../layouts/LoginRegisterLayout";
import FormHeader from "../../components/FormHeader";
import LoginRegisterCard from "../../components/LoginRegisterCard";
import RegisterForm from "./components/RegisterForm";
const RegisterPage = () => {
  return (
    <LoginRegisterLayout>
      <FormHeader titleFirstWord="Create" titleSecondWord="Account" subTitle="Create your account to get started" />
      <LoginRegisterCard>
        <RegisterForm />
      </LoginRegisterCard>
    </LoginRegisterLayout>
  );
};

export default RegisterPage;
