import { useState } from "react";
import GameModeTabs from "./components/GameModeTabs";
import IndividualGameForm from "./IndividualGame/IndividualGameForm";
import TeamGameForm from "./TeamGame/TeamGameForm";
import DuelGameForm from "./DuelGame/DuelGameForm";
import Header from "../../components/Header";
import BottomNavOneButton from "../../components/BottomNavOneButton";
import { useToast } from "../../context/ToastContext";
import {
  createIndividualGame,
  createTeamGame,
  createDuelGame,
} from "../../services/gameApi";
function CreateGamePage() {
  const [activeMode, setActiveMode] = useState("individual");
  const [activeFormData, setActiveFormData] = useState({});
  const { success: showSuccess, error: showError } = useToast();

  const renderFormByMode = () => {
    if (activeMode === "teams") {
      return <TeamGameForm onFormDataChange={setActiveFormData} />;
    }

    if (activeMode === "duel") {
      return <DuelGameForm onFormDataChange={setActiveFormData} />;
    }

    return <IndividualGameForm onFormDataChange={setActiveFormData} />;
  };

  const handleCreateClick = async () => {
    if (activeMode === "individual") {
      console.log("Crear juego individual", activeFormData);
      try {
        await createIndividualGame(activeFormData);
        showSuccess("Juego individual creado exitosamente.");
      } catch (error) {
        console.error("Error al crear juego individual:", error);
        showError("Error al crear el juego individual. Intenta nuevamente.");
      }
    } else if (activeMode === "teams") {
      console.log("Crear juego por equipos", activeFormData);
      try {
        await createTeamGame(activeFormData);
        showSuccess("Juego en equipo creado exitosamente.");
      } catch (error) {
        console.error("Error al crear juego en equipo:", error);
        showError("Error al crear el juego en equipo. Intenta nuevamente.");
      }
    } else if (activeMode === "duel") {
      console.log("Crear duelo", activeFormData);
      try {
        await createDuelGame(activeFormData);
        showSuccess("Duelo creado exitosamente.");
      } catch (error) {
        console.error("Error al crear duelo:", error);
        showError("Error al crear el duelo. Intenta nuevamente.");
      }
    }
  };

  const getCreateButtonTitle = () => {
    if (activeMode === "individual") {
      return "Crear juego individual";
    }

    if (activeMode === "teams") {
      return "Crear juego por equipos";
    }

    if (activeMode === "duel") {
      return "Crear duelo";
    }

    return "Crear";
  };

  return (
    <div className="bg-surface min-h-screen pb-24">
      <Header title="Crear Juego" />

      <main className="px-4 pb-32">
        <GameModeTabs activeMode={activeMode} onModeChange={setActiveMode} />
        {renderFormByMode()}
      </main>

      <BottomNavOneButton
        onClick={handleCreateClick}
        buttonTitle={getCreateButtonTitle()}
        disabled={false}
      />
    </div>
  );
}

export default CreateGamePage;
