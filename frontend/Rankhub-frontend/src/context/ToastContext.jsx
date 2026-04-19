import { createContext, useContext, useMemo } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ToastContext = createContext();

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

export const ToastProvider = ({ children }) => {
  const success = (message) => {
    toast.success(message, toastConfig);
  };
  const warning = (message) => {
    toast.warning(message, toastConfig);
  };
  const error = (message) => {
    toast.error(message, toastConfig);
  };

  const value = useMemo(() => ({ success, warning, error }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
