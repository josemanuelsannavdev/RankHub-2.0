import RegisterLayout from "./RegisterLayout";
import RegisterHeader from "./RegisterHeader";
import RegisterCard from "./RegisterCard";
import RegisterForm from "./RegisterForm";
const RegisterPage = () => {
  return (
    <RegisterLayout>
      <RegisterHeader/>
      <RegisterCard>
          <RegisterForm/>
      </RegisterCard>
    </RegisterLayout>
  );
};

export default RegisterPage;
