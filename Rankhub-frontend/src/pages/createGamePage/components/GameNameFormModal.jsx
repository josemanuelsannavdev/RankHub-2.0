import PropTypes from "prop-types";
import Modal from "../../../components/Modal";
import GameNameForm from "./GameNameForm";

function GameNameFormModal({  onClose, onGameNameCreated }) {
  return (
    <Modal
      title="Agregar nuevo juego"
      description="Ingresa el nombre del nuevo juego que deseas agregar al ranking."
      
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
