import PropTypes from "prop-types";
import Modal from "../../components/Modal";
import PlayerForm from "./PlayerForm";

function PlayerFormModal({ playerToEdit, onClose, onPlayerCreated }) {
  return (
    <Modal
      title={playerToEdit ? "Edit Player" : "New Player"}
      description={
        playerToEdit
          ? "Modify your player details"
          : "Configure the details of your new player"
      }
    >
      <PlayerForm
        key={playerToEdit?.id || "new"}
        onClose={onClose}
        onPlayerCreated={onPlayerCreated}
        playerToEdit={playerToEdit}
      />
    </Modal>
  );
}

PlayerFormModal.propTypes = {
  playerToEdit: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onClose: PropTypes.func.isRequired,
  onPlayerCreated: PropTypes.func.isRequired,
};

export default PlayerFormModal;
