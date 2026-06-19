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
        titleFirstWord="Log in to your account"
        titleSecondWord="now"
        subTitle="Log in to your account to continue"
      />
      <LoginRegisterCard
        optionalTitle="Log in to your account with Google"
        onGoogleLogin={handleGoogleLogin}
      >
        <LoginForm />
      </LoginRegisterCard>
    </LoginRegisterLayout>
  );
};

export default LoginPage;
