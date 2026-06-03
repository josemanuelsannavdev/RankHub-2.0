import PropTypes from "prop-types";
import Modal from "../../../components/Modal";
import OptionButton from "../../../components/OptionButton";
import CancelButton from "../../../components/CancelButton";

function GameOptionModal({ game, onEdit, onDelete, onViewStats, onClose }) {
  if (!game) {
    return null;
  }

  return (
    <Modal title="Options" description="These are the options for the game">
      <OptionButton
        text="edit"
        important={false}
        icon="edit"
        onClick={() => onEdit(game)}
      />
      <OptionButton
        text="view stats"
        important={false}
        icon="Leaderboard"
        onClick={() => onViewStats(game)}
      />
      <OptionButton
        text="delete"
        important={true}
        icon="delete"
        onClick={() => onDelete(game)}
      />
      
      <CancelButton text="Cancel" onClick={onClose} />
    </Modal>
  );
}

GameOptionModal.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onViewStats: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GameOptionModal;
