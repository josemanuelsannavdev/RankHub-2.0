import LoginRegisterLayout from "../../layouts/LoginRegisterLayout";
import FormHeader from "../../components/FormHeader";
import LoginRegisterCard from "../../components/LoginRegisterCard";
import LoginForm from "./LoginForm";
import { getGoogleAuthorizationUrl } from "../../services/authApi";
import { useToast } from "../../context/ToastContext";

const LoginPage = () => {
  const { error: showError } = useToast();

  const handleGoogleLogin = async () => {
    try {
      const response = await getGoogleAuthorizationUrl();
      const oauthPath = response?.data?.authorizationUrl;
      if (!oauthPath) {
        throw new Error("OAuth authorization URL not found");
      }

      const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8762";
      const authorizationUrl = new URL(`/auth-service${oauthPath}`, baseUrl).toString();
      globalThis.location.assign(authorizationUrl);
    } catch (error) {
      console.error("Error al iniciar OAuth con Google:", error);
      showError("No se pudo iniciar sesión con Google.");
    }
  };

  return (
    <LoginRegisterLayout>
      <FormHeader titleFirstWord="Inicia sesión en tu cuenta" titleSecondWord="ahora" subTitle="Accede a tu cuenta para continuar" />
      <LoginRegisterCard optionalTitle="Inicia sesión en tu cuenta" onGoogleLogin={handleGoogleLogin}>
          <LoginForm/>
      </LoginRegisterCard>
    </LoginRegisterLayout>
  );
};

export default LoginPage;
