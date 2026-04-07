import LoginLayout from "./LoginLayout";
import LoginHeader from "./LoginHeader";
import LoginCard from "./LoginCard";
import LoginForm from "./LoginForm";
const LoginPage = () => {
  return (
    <LoginLayout>
      <LoginHeader/>
      <LoginCard>
          <LoginForm/>
      </LoginCard>
    </LoginLayout>
  );
};

export default LoginPage;
