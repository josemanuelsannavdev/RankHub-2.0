import { useState } from "react";
import FormInput from "../../components/FormInput";
import IconSelect from "../../components/IconSelect";
import SubmitButton from "../../components/SubmitButton";
import CancelButton from "../../components/CancelButton";
import PropTypes from "prop-types";
import { createRanking, updateRanking } from "../../services/rankingApi";
import { useToast } from "../../context/ToastContext";

const RankingForm = ({ onClose, onRankingCreated, rankingToEdit }) => {
  const [icon, setIcon] = useState(rankingToEdit?.icon || "");
  const [name, setName] = useState(rankingToEdit?.name || "");
  const { success: showSuccess, error: showError, warning: showWarning } = useToast();

  const isEditMode = !!rankingToEdit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !icon) {
      showWarning("Por favor, completa todos los campos.");
    } else {
      try {
        if (isEditMode) {
          const response = await updateRanking(rankingToEdit.id, {
            name,
            icon,
          });
          const editedRanking = {
            ...rankingToEdit,
            ...response.data,
          };
          showSuccess("Ranking editado exitosamente.");
          onRankingCreated(editedRanking);
        } else {
          const newRanking = await createRanking({ name, icon });
          showSuccess("Ranking creado exitosamente.");
          onRankingCreated(newRanking.data);
        }

        onClose();
      } catch (error) {
        console.error("Error al crear o editar ranking:", error);
        showError("Error al crear o editar el ranking. Intenta nuevamente.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-6">
        <FormInput
          label="Nombre del ranking"
          type="text"
          placeholder="Ej: Liga de Fútbol 2024"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <IconSelect selected={icon} onSelect={setIcon} />
      </div>
      <div className="p-6 space-y-3 bg-gradient-to-t from-background-dark to-transparent">
        <SubmitButton
          text={isEditMode ? "Guardar cambios" : "Crear ranking"}
          fullWidth
        />
        <CancelButton text="Cancelar" fullWidth onClick={onClose} />
      </div>
    </form>
  );
};

RankingForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRankingCreated: PropTypes.func,
};
export default RankingForm;
