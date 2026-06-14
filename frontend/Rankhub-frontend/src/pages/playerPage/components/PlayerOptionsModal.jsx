import PropTypes from "prop-types";
import Modal from "../../../components/Modal";
import OptionButton from "../../../components/OptionButton";
import CancelButton from "../../../components/CancelButton";
import usePlayerOption from "../hooks/usePlayerOption";

function PlayerOptionsModal({ player, onEdit, onClose }) {
  const { handleEdit, handleDelete } = usePlayerOption({ player, onEdit, onClose });

  return (
    <Modal title="Options" description="These are the options for the player">
      <OptionButton
        text="edit"
        important={false}
        icon="edit"
        onClick={handleEdit}
      />
      <OptionButton
        text="Delete"
        important={true}
        icon="delete"
        onClick={handleDelete}
      />

      <CancelButton text="Cancel" onClick={onClose} />
    </Modal>
  );
}

PlayerOptionsModal.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,

  onClose: PropTypes.func.isRequired,
};

export default PlayerOptionsModal;
