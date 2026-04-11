import LoginRegisterLayout from "../../layouts/LoginRegisterLayout";
import FormHeader from "../../components/FormHeader";
import LoginRegisterCard from "../../components/LoginRegisterCard";
import LoginForm from "./LoginForm";
const LoginPage = () => {
  return (
    <LoginRegisterLayout>
      <FormHeader title="Inicia sesión en tu cuenta" />
      <LoginRegisterCard optionalTitle="Inicia sesión en tu cuenta">
          <LoginForm/>
      </LoginRegisterCard>
    </LoginRegisterLayout>
  );
};

export default LoginPage;
