

import { useMemo } from "react";
import IndividualGameForm from "../IndividualGame/IndividualGameForm";
import TeamGameForm from "../TeamGame/TeamGameForm";
import DuelGameForm from "../DuelGame/DuelGameForm";

const BUTTON_CONFIG = {
  individual: "Create Individual Game",
  teams: "Create Team Game",
  duel: "Create Duel",
};


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
