import { useCallback, useState } from "react";
import { useRanking } from "../../../context/RankingContext";
import { useToast } from "../../../context/ToastContext";
import { createGameName } from "../../../services/gameApi";

export const useGameName = (onClose, onGameNameCreated) => {
  const [name, setName] = useState("");
  const { currentRanking } = useRanking();
  const {
    success: showSuccess,
    error: showError,
    warning: showWarning,
  } = useToast();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!name.trim()) {
        showWarning("Por favor, completa todos los campos.");
        return;
      }

      try {
        const newGame = await createGameName({
          name: name.trim(),
          rankingId: currentRanking?.id,
        });

        showSuccess("Nombre del juego creado exitosamente.");

        if (onGameNameCreated) {
          onGameNameCreated(newGame.data);
        }

        setName("");

        if (onClose) {
          onClose();
        }
      } catch (error) {
        console.error("Error al añadir nombre del juego:", error);
        showError("Error al añadir el juego. Intenta nuevamente.");
      }
    },
    [
      name,
      currentRanking?.id,
      onClose,
      onGameNameCreated,
      showError,
      showSuccess,
      showWarning,
    ],
  );

  return {
    name,
    setName,
    handleSubmit,
  };
};
