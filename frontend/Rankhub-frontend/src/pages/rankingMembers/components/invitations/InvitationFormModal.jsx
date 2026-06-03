import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../../../../components/Modal.jsx";
import FormInput from "../../../../components/FormInput.jsx";
import SubmitButton from "../../../../components/SubmitButton.jsx";
import CancelButton from "../../../../components/CancelButton.jsx";
import { useToast } from "../../../../context/ToastContext.jsx";

const InvitationFormModal = ({ onClose, onSendInvitation }) => {
  const [email, setEmail] = useState("");
  const { success: showSuccess, warning: showWarning, error: showError } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      showWarning("Introduce un email para enviar la invitación.");
      return;
    }

    try {
      await onSendInvitation(trimmedEmail);
      showSuccess("Invitación enviada correctamente.");
      setEmail("");
      onClose();
    } catch (sendError) {
      console.error("Error al enviar la invitación:", sendError);
      showError("No se pudo enviar la invitación. Intenta nuevamente.");
    }
  };

  return (
    <Modal
      title="Send invitation"
      description="Invite a new member to the current ranking by email."
    >
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-6">
          <FormInput
            label="Email address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="p-6 space-y-3 bg-gradient-to-t from-background-dark to-transparent">
          <SubmitButton text="Send invitation" />
          <CancelButton text="Cancel" onClick={onClose} />
        </div>
      </form>
    </Modal>
  );
};

InvitationFormModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSendInvitation: PropTypes.func.isRequired,
};

export default InvitationFormModal;
