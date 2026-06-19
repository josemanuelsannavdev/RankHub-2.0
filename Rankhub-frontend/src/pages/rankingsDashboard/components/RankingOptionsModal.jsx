import PropTypes from "prop-types";
import Modal from "../../../components/Modal";
import OptionButton from "../../../components/OptionButton";
import CancelButton from "../../../components/CancelButton";
import { useRanking } from "../../../context/RankingContext";

function RankingOptionsModal({
  ranking,
  onEdit,
  onDelete,
  onExit,
  onClose,
  onMembersSection,
}) {
  const { currentRanking } = useRanking();
  const roleAdminSubadmin =
    currentRanking?.role === "ADMIN" || currentRanking?.role === "SUB_ADMIN";
  
  
    return (
    <Modal title="Options" description="These are the options for the ranking">
      {roleAdminSubadmin && (
        <>
          <OptionButton
            text="edit"
            important={false}
            icon="edit"
            onClick={() => onEdit(ranking)}
          />
          <OptionButton
            text="edit members"
            important={false}
            icon="person_edit"
            onClick={() => onMembersSection(ranking)}
          />
          <OptionButton
            text="delete"
            important={true}
            icon="delete"
            onClick={() => onDelete(ranking)}
          />
        </>
      )}
      <OptionButton
        text="exit ranking"
        important={true}
        icon="cancel"
        onClick={() => onExit(ranking)}
      />
      <div className="p-6 space-y-3 bg-gradient-to-t from-background-dark to-transparent">
        <CancelButton text="Cancel" onClick={onClose} />
      </div>
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
  onMembersSection: PropTypes.func.isRequired,
};

export default RankingOptionsModal;
