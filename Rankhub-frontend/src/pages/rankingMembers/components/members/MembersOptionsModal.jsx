import PropTypes from "prop-types";
import Modal from "../../../../components/Modal";
import OptionButton from "../../../../components/OptionButton";
import CancelButton from "../../../../components/CancelButton";

function MembersOptionsModal({ member, onChangeRole, onDelete, onClose }) {
  return (
    <Modal title="Options" description="These are the options for the ranking">
      <OptionButton
        text={`change role to ${
          member?.role?.toLowerCase() === "sub_admin" ? "guest" : "subadmin"
        }`}
        important={false}
        icon="swap_horiz"
        onClick={() => onChangeRole(member)}
      />

      <OptionButton
        text="delete"
        important={true}
        icon="delete"
        onClick={() => onDelete(member)}
      />
      <div className="p-6 space-y-3 bg-gradient-to-t from-background-dark to-transparent">
        <CancelButton text="Cancel" onClick={onClose} />
      </div>
    </Modal>
  );
}

MembersOptionsModal.propTypes = {
  member: PropTypes.shape({
    role: PropTypes.string,
  }).isRequired,
  onChangeRole: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MembersOptionsModal;
