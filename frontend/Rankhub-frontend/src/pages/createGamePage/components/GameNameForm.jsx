import { useRef, useState } from "react";
import FormInput from "../../../components/FormInput";
import SubmitButton from "../../../components/SubmitButton";
import CancelButton from "../../../components/CancelButton";
import PropTypes from "prop-types";
import { useToast } from "../../../context/ToastContext";
import { useRanking } from "../../../context/RankingContext";
import { createGameName } from "../../../services/gameApi";
const GameNameForm = ({ onClose, onGameNameCreated }) => {
  const [name, setName] = useState("");
  const { currentRanking } = useRanking();
  const {
    success: showSuccess,
    error: showError,
    warning: showWarning,
  } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      showWarning("Por favor, completa todos los campos.");
    } else {
      try {
        const newGame = await createGameName({
          name,
          rankingId: currentRanking?.id,
        });
        showSuccess("Nombre del juego creado exitosamente.");
        onGameNameCreated(newGame.data);

        onClose();
      } catch (error) {
        console.error("Error al añadir nombre del juego:", error);
        showError("Error al añadir el juego. Intenta nuevamente.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-6">
        <FormInput
          label="Nombre del juego"
          type="text"
          placeholder="Ej: Fifa 2023"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="p-6 space-y-3 bg-gradient-to-t from-background-dark to-transparent">
        <SubmitButton text={"Crear juego"} fullWidth />
        <CancelButton text="Cancelar" fullWidth onClick={onClose} />
      </div>
    </form>
  );
};

GameNameForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onGameNameCreated: PropTypes.func,
};
export default GameNameForm;
