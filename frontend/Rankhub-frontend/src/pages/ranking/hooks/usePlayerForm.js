import { useCallback, useRef, useState } from "react";
import { createPlayer, updatePlayer } from "../../../services/playerApi";
import { uploadImageToCloudinary } from "../../../services/cloudinaryApi";
import { useToast } from "../../../context/ToastContext";
import { useRanking } from "../../../context/RankingContext";
import { validatePlayerForm } from "../utils/validation";

export const usePlayerForm = ({ playerToEdit, onPlayerCreated, onClose }) => {
  const [image, setImage] = useState(playerToEdit?.image || "");
  const [name, setName] = useState(playerToEdit?.name || "");
  const fileInputRef = useRef(null);

  const { currentRanking } = useRanking();
  const { success: showSuccess, error: showError, warning: showWarning } = useToast();

  const isEditMode = !!playerToEdit;

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageSelect = useCallback(
    (e) => {
      const selectedFile = e.target.files?.[0];

      if (!selectedFile) {
        return;
      }

      if (!selectedFile.type.startsWith("image/")) {
        showWarning("Selecciona un archivo de imagen válido.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(selectedFile);
    },
    [showWarning],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const { valid, message } = validatePlayerForm({ name });
      if (!valid) {
        showWarning(message);
        return;
      }

      try {
        const imageUrl = await uploadImageToCloudinary(image);

        if (isEditMode) {
          console.log("Plater to edit:", playerToEdit);
          const response = await updatePlayer(playerToEdit.id, {
            name,
            image: imageUrl || playerToEdit.image,
            rankingId: currentRanking?.id,
          });

          const editedPlayer = {
            ...playerToEdit,
            ...response.data,
          };

          showSuccess("Jugador editado exitosamente.");
          onPlayerCreated?.(editedPlayer);
        } else {
          const newPlayer = await createPlayer({
            name,
            image: imageUrl || "",
            rankingId: currentRanking?.id,
          });

          showSuccess("Jugador creado exitosamente.");
          onPlayerCreated?.(newPlayer.data);
        }

        onClose?.();
      } catch (error) {
        console.error("Error al crear o editar jugador:", error);
        showError("Error al crear o editar el jugador. Intenta nuevamente.");
      }
    },
    [currentRanking?.id, image, isEditMode, name, onClose, onPlayerCreated, playerToEdit, showError, showSuccess, showWarning],
  );

  return {
    fileInputRef,
    image,
    name,
    isEditMode,
    handleSubmit,
    handleImageSelect,
    openFilePicker,
    setName,
  };
};
