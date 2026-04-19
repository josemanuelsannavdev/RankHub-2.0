import PropTypes from "prop-types";
import Modal from "../../components/Modal";
import RankingForm from "./RankingForm";

function RankingFormModal({ rankingToEdit, onClose, onRankingCreated }) {
  return (
    <Modal
      title={rankingToEdit ? "Edit Ranking" : "New Ranking"}
      description={
        rankingToEdit
          ? "Modify your ranking"
          : "Configure the details of your new ranking"
      }
    >
      <RankingForm
        key={rankingToEdit?.id || "new"}
        onClose={onClose}
        onRankingCreated={onRankingCreated}
        rankingToEdit={rankingToEdit}
      />
    </Modal>
  );
}

RankingFormModal.propTypes = {
  rankingToEdit: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onClose: PropTypes.func.isRequired,
  onRankingCreated: PropTypes.func.isRequired,
};

export default RankingFormModal;
