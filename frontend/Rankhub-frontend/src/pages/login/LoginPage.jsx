import LoginRegisterLayout from "../../layouts/LoginRegisterLayout";
import FormHeader from "../../components/FormHeader";
import LoginRegisterCard from "../../components/LoginRegisterCard";
import LoginForm from "./components/LoginForm";
import { useLogin } from "./hooks/useLogin";
const LoginPage = () => {
  const { handleGoogleLogin } = useLogin();

  return (
    <LoginRegisterLayout>
      <FormHeader
        titleFirstWord="Inicia sesión en tu cuenta"
        titleSecondWord="ahora"
        subTitle="Accede a tu cuenta para continuar"
      />
      <LoginRegisterCard
        optionalTitle="Inicia sesión en tu cuenta"
        onGoogleLogin={handleGoogleLogin}
      >
        <LoginForm />
      </LoginRegisterCard>
    </LoginRegisterLayout>
  );
};

export default LoginPage;
