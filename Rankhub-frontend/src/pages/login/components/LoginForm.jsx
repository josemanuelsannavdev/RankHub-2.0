import BottomLink from "../../../components/BottomLink";
import FormInputIcon from "../../../components/FormInputIcon";
import SubmitButton from "../../../components/SubmitButton";

import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const { handleLogin, setEmail, setPassword, email, password } = useLogin();

  return (
    <form onSubmit={handleLogin}>
      <FormInputIcon
        label="Email"
        icon="mail"
        type="email"
        placeholder="YOUR@EMAIL.COM"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormInputIcon
        label="Password"
        icon="lock"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <SubmitButton text="Log In" />
      <BottomLink
        firstPart="Don't you have an account?"
        secondPart="Sign up here"
        href="/register"
      />
    </form>
  );
};

export default LoginForm;
