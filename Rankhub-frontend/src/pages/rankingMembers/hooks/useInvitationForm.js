import { useCallback, useState } from "react";
import { useToast } from "../../../context/ToastContext.jsx";

const useInvitationForm = ({ onClose, onSendInvitation }) => {
  const [email, setEmail] = useState("");
  const { success: showSuccess, warning: showWarning, error: showError } = useToast();

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const trimmedEmail = email.trim();

      if (!trimmedEmail) {
        showWarning("Introduce un email para enviar la invitacion.");
        return;
      }

      try {
        await onSendInvitation(trimmedEmail);
        showSuccess("Invitacion enviada correctamente.");
        setEmail("");
        onClose();
      } catch (sendError) {
        console.error("Error al enviar la invitacion:", sendError);
        showError("No se pudo enviar la invitacion. Intenta nuevamente.");
      }
    },
    [email, onClose, onSendInvitation, showError, showSuccess, showWarning],
  );

  return {
    email,
    handleEmailChange,
    handleSubmit,
  };
};

export default useInvitationForm;
