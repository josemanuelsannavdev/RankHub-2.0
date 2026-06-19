import Modal from "../../components/Modal";
import BetForm from "./BetForm";
import PropTypes from "prop-types";

function BetFormModal({ onClose, onSubmit, playersBet }) {
    return (
      <Modal
        title="Place Your Bet"
        description="Configure the details of your new bet"
      >
        <BetForm
          onClose={onClose}
          onSubmit={onSubmit}
          playersBet={playersBet}
        />
      </Modal>
    );
}

BetFormModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  playersBet: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default BetFormModal;