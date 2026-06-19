import PropTypes from "prop-types";
import Modal from "../../../../components/Modal.jsx";
import FormInput from "../../../../components/FormInput.jsx";
import SubmitButton from "../../../../components/SubmitButton.jsx";
import CancelButton from "../../../../components/CancelButton.jsx";
import useInvitationForm from "../../hooks/useInvitationForm.js";

const InvitationFormModal = ({ onClose, onSendInvitation }) => {
  const { email, handleEmailChange, handleSubmit } = useInvitationForm({
    onClose,
    onSendInvitation,
  });

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
            onChange={handleEmailChange}
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
