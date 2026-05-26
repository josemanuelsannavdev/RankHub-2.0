/**
 * Hook to manage game creation with API calls
 * Handles all game type creation requests with unified error/success handling
 */

import { useCallback } from "react";
import { useToast } from "../../../context/ToastContext";
import {
  createIndividualGame,
  createTeamGame,
  createDuelGame,
} from "../../../services/gameApi";

/**
 * API call configuration for each game mode
 */
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

/**
 * Custom hook for handling game creation
 * Manages API calls, error handling, and toast notifications
 *
 * @returns {Object} Handler functions for game creation
 */
export const useGameCreation = () => {
  const { success: showSuccess, error: showError } = useToast();

  const createGame = useCallback(
    async (gameMode, formData) => {
      const config = GAME_MODE_CONFIG[gameMode];
      if (!config) {
        console.error(`Unknown game mode: ${gameMode}`);
        return;
      }

      console.log(`Crear ${config.label}`, formData);

      try {
        await config.apiCall(formData);
        showSuccess(config.successMessage);
      } catch (error) {
        console.error(`Error al crear ${config.label}:`, error);
        showError(config.errorMessage);
      }
    },
    [showSuccess, showError],
  );

  return { createGame };
};
