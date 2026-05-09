import { useCallback, useState } from "react";
import { createRanking, updateRanking } from "../../../services/rankingApi";
import { useToast } from "../../../context/ToastContext";
import validateRankingForm from "../utils/validation";

export const useRankingForm = ({ rankingToEdit, onRankingCreated, onClose }) => {
  const [icon, setIcon] = useState(rankingToEdit?.icon || "");
  const [name, setName] = useState(rankingToEdit?.name || "");
  const [description, setDescription] = useState(rankingToEdit?.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    success: showSuccess,
    error: showError,
    warning: showWarning,
  } = useToast();

  const isEditMode = !!rankingToEdit;

  const onNameChange = useCallback((e) => setName(e.target.value), []);
  const onDescriptionChange = useCallback((e) => setDescription(e.target.value), []);
  const onIconSelect = useCallback((value) => setIcon(value), []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const { valid, message } = validateRankingForm({ name, icon });
      if (!valid) {
        showWarning(message);
        return;
      }

      setIsSubmitting(true);

      try {
        if (isEditMode) {
          const response = await updateRanking(rankingToEdit.id, {
            name,
            icon,
            description,
          });

          const editedRanking = {
            ...rankingToEdit,
            ...response.data,
          };

          showSuccess("Ranking editado exitosamente.");
          onRankingCreated?.(editedRanking);
        } else {
          const newRanking = await createRanking({ name, icon, description });
          showSuccess("Ranking creado exitosamente.");
          onRankingCreated?.(newRanking.data);
        }

        onClose?.();
      } catch (error) {
        console.error("Error al crear o editar ranking:", error);
        showError("Error al crear o editar el ranking. Intenta nuevamente.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      description,
      icon,
      isEditMode,
      name,
      onClose,
      onRankingCreated,
      rankingToEdit,
      showError,
      showSuccess,
      showWarning,
    ],
  );

  return {
    name,
    description,
    icon,
    isEditMode,
    isSubmitting,
    onNameChange,
    onDescriptionChange,
    onIconSelect,
    handleSubmit,
  };
};
