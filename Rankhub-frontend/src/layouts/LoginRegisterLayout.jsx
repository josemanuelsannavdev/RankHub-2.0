import PropTypes from "prop-types";
import "../styles/login/Login.css";
const LoginRegisterLayout = ({ children }) => {
  return (
    <main className="main-container">
      <div className="main-content">{children}</div>
    </main>
  );
};

LoginRegisterLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LoginRegisterLayout;
