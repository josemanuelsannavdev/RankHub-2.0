import PropTypes from "prop-types";
import FormInput from "../../../components/FormInput";
import IconSelect from "../../../components/IconSelect";
import SubmitButton from "../../../components/SubmitButton";
import CancelButton from "../../../components/CancelButton";
import { useRankingForm } from "../hooks/useRankingForm";

const RankingForm = ({ onClose, onRankingCreated, rankingToEdit }) => {
  const {
    name,
    description,
    icon,
    isEditMode,
    isSubmitting,
    onNameChange,
    onDescriptionChange,
    onIconSelect,
    handleSubmit,
  } = useRankingForm({ rankingToEdit, onRankingCreated, onClose });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-2 space-y-6">
        <FormInput
          label="Ranking Name"
          type="text"
          placeholder="Ex: Football Ranking"
          value={name}
          onChange={onNameChange}
        />
        <FormInput
          label="Descripción"
          type="text"
          placeholder="Ex: Best league of football in the world"
          value={description}
          onChange={onDescriptionChange}
        />
        <IconSelect selected={icon} onSelect={onIconSelect} />
      </div>
      <div className="p-6 space-y-3 from-background-dark to-transparent shrink-0">
        <SubmitButton
          text={isEditMode ? "Save changes" : "Create ranking"}
          fullWidth
          disabled={isSubmitting}
        />
        <CancelButton text="Cancel" fullWidth onClick={onClose} />
      </div>
    </form>
  );
};

RankingForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRankingCreated: PropTypes.func,
  rankingToEdit: PropTypes.object,
};
export default RankingForm;
