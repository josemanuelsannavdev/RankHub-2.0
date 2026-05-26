/**
 * Hook to manage game mode rendering logic
 * Returns appropriate form component based on active mode
 */

import { useMemo } from "react";
import IndividualGameForm from "../IndividualGame/IndividualGameForm";
import TeamGameForm from "../TeamGame/TeamGameForm";
import DuelGameForm from "../DuelGame/DuelGameForm";

/**
 * Button configuration for each game mode
 */
const BUTTON_CONFIG = {
  individual: "Crear juego individual",
  teams: "Crear juego por equipos",
  duel: "Crear duelo",
};

/**
 * Custom hook for game mode rendering
 * Returns form component and button text based on mode
 *
 * @param {string} activeMode - Currently selected game mode
 * @param {Function} onFormDataChange - Callback when form data changes
 * @returns {Object} Form component and button text
 */
export const useGameModeRendering = (activeMode, onFormDataChange) => {
  const formComponent = useMemo(() => {
    if (activeMode === "teams") {
      return <TeamGameForm onFormDataChange={onFormDataChange} />;
    }

    if (activeMode === "duel") {
      return <DuelGameForm onFormDataChange={onFormDataChange} />;
    }

    return <IndividualGameForm onFormDataChange={onFormDataChange} />;
  }, [activeMode, onFormDataChange]);

  const buttonTitle = BUTTON_CONFIG[activeMode] || "Crear";

  return { formComponent, buttonTitle };
};
