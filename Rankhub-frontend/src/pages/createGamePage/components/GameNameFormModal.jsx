import PropTypes from "prop-types";
import Modal from "../../../components/Modal";
import GameNameForm from "./GameNameForm";

function GameNameFormModal({  onClose, onGameNameCreated }) {
  return (
    <Modal
      title="Add Game Name"
      description="Enter the name of the new game you want to add to the ranking."
      
    >
      <GameNameForm
        onClose={onClose}
        onGameNameCreated={onGameNameCreated}
      />
    </Modal>
  );
}

GameNameFormModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onGameNameCreated: PropTypes.func,
};
export default GameNameFormModal;
