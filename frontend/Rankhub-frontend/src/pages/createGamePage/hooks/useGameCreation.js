
import { useCallback } from "react";
import { useRanking } from "../../../context/RankingContext";
import { useToast } from "../../../context/ToastContext";
import { sendChatMessage } from "../../../services/chatApi";
import {
  createIndividualGame,
  createTeamGame,
  createDuelGame,
} from "../../../services/gameApi";


const GAME_MODE_CONFIG = {
  individual: {
    apiCall: createIndividualGame,
    successMessage: "Juego individual creado exitosamente.",
    errorMessage: "Error al crear el juego individual. Intenta nuevamente.",
    label: "juego individual",
  },
  teams: {
    apiCall: createTeamGame,
    successMessage: "Juego en equipo creado exitosamente.",
    errorMessage: "Error al crear el juego en equipo. Intenta nuevamente.",
    label: "juego en equipo",
  },
  duel: {
    apiCall: createDuelGame,
    successMessage: "Duelo creado exitosamente.",
    errorMessage: "Error al crear el duelo. Intenta nuevamente.",
    label: "duelo",
  },
};


export const useGameCreation = () => {
  const { success: showSuccess, error: showError } = useToast();
  const { currentRanking } = useRanking();

  const sendGameCreatedMessage = useCallback(
    async (gameName) => {
      if (!currentRanking?.id || !gameName?.trim()) {
        return;
      }

      try {
        await sendChatMessage(currentRanking.id, {
          username: "EVENTO",
          body: `New game : ${gameName}`,
        });
      } catch (error) {
        console.error("Error al enviar el mensaje de evento al chat:", error);
      }
    },
    [currentRanking?.id],
  );

  const createGame = useCallback(
    async (gameMode, formData) => {
      const config = GAME_MODE_CONFIG[gameMode];
      if (!config) {
        console.error(`Unknown game mode: ${gameMode}`);
        return;
      }


      try {
        const createdGame = await config.apiCall(formData);
        showSuccess(config.successMessage);
        await sendGameCreatedMessage(createdGame?.data?.name ?? formData?.name);
      } catch (error) {
        console.error(`Error al crear ${config.label}:`, error);
        showError(config.errorMessage);
      }
    },
    [showSuccess, showError, sendGameCreatedMessage],
  );

  return { createGame };
};
