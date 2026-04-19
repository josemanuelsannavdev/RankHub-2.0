import PropTypes from "prop-types";
import Modal from "../../components/Modal";
import OptionButton from "../../components/OptionButton";
import CancelButton from "../../components/CancelButton";

function RankingOptionsModal({ ranking, onEdit, onDelete, onExit, onClose }) {
  return (
    <Modal title="Opciones" description="Estas son las opciones del ranking">
      <OptionButton
        text="editar"
        important={false}
        icon="edit"
        onClick={() => onEdit(ranking)}
      />
      <OptionButton
        text="editar integrantes"
        important={false}
        icon="person_edit"
      />
      <OptionButton
        text="borrar"
        important={true}
        icon="delete"
        onClick={() => onDelete(ranking)}
      />
      <OptionButton
        text="salir del ranking"
        important={true}
        icon="cancel"
        onClick={() => onExit(ranking)}
      />
      <CancelButton text="Cancelar" onClick={onClose} />
    </Modal>
  );
}

RankingOptionsModal.propTypes = {
  ranking: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RankingOptionsModal;
