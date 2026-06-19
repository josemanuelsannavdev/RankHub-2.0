import PropTypes from "prop-types";
import Modal from "../../../components/Modal";
import OptionButton from "../../../components/OptionButton";
import CancelButton from "../../../components/CancelButton";
import { useRanking } from "../../../context/RankingContext";
function GameOptionModal({ game, onEdit, onDelete, onViewStats, onClose }) {
  if (!game) {
    return null;
  }
  const { currentRanking } = useRanking();
  const roleAdminSubadmin =
    currentRanking?.role === "ADMIN" || currentRanking?.role === "SUB_ADMIN";
  return (
    <Modal title="Options" description="These are the options for the game">
      {roleAdminSubadmin && (
        <OptionButton
          text="edit"
          important={false}
          icon="edit"
          onClick={() => onEdit(game)}
        />
      )}
      <OptionButton
        text="view stats"
        important={false}
        icon="Leaderboard"
        onClick={() => onViewStats(game)}
      />
      {roleAdminSubadmin && (
        <OptionButton
          text="delete"
          important={true}
          icon="delete"
          onClick={() => onDelete(game)}
        />
      )}
      <div className="p-6 space-y-3 bg-gradient-to-t from-background-dark to-transparent">
        <CancelButton text="Cancel" onClick={onClose} />
      </div>
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
