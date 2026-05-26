import { useState, useCallback } from "react";
import GameModeTabs from "./components/GameModeTabs";
import Header from "../../components/Header";
import BottomNavOneButton from "../../components/BottomNavOneButton";
import { useGameCreation } from "./hooks/useGameCreation";
import { useGameModeRendering } from "./hooks/useGameModeRendering";


function CreateGamePage() {
  const [activeMode, setActiveMode] = useState("individual");
  const [activeFormData, setActiveFormData] = useState({});
  const { createGame } = useGameCreation();
  const { formComponent, buttonTitle } = useGameModeRendering(
    activeMode,
    setActiveFormData,
  );

  const handleCreateClick = useCallback(() => {
    createGame(activeMode, activeFormData);
  }, [activeMode, activeFormData, createGame]);

  return (
    <div className="bg-surface min-h-screen pb-24">
      <Header title="Crear Juego" />

      <main className="px-4 pb-32">
        <GameModeTabs activeMode={activeMode} onModeChange={setActiveMode} />
        {formComponent}
      </main>

      <BottomNavOneButton
        onClick={handleCreateClick}
        buttonTitle={buttonTitle}
        disabled={false}
      />
    </div>
  );
}

export default CreateGamePage;
