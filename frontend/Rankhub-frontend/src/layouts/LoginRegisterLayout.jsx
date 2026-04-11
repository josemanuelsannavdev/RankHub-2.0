import PropTypes from "prop-types";

const LoginRegisterLayout = ({ children }) => {
  return (
    <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden dark:bg-background-dark">
      
      {/* Background Aesthetic Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" ></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/5 blur-[120px] rounded-full"></div>

      {/* Contenido */}
      <div className="w-full max-w-md z-10">
        {children}
      </div>

    </main>
  );
};

LoginRegisterLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LoginRegisterLayout;