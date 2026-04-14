import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";

const ToastContext = createContext();

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnCLick: true,
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

  return (
    <ToastContext.Provider value={{ success, warning, error }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};
