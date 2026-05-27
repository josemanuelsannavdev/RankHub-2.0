import PropTypes from "prop-types";
import Modal from "../../../components/Modal";
import OptionButton from "../../../components/OptionButton";
import CancelButton from "../../../components/CancelButton";

function GameOptionModal({ game, onEdit, onDelete, onViewStats, onClose }) {
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

};

export default GameOptionModal;
