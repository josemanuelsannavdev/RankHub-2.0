import { useRef, useState } from "react";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import CancelButton from "../../components/CancelButton";
import PropTypes from "prop-types";
import { createPlayer, updatePlayer } from "../../services/playerApi";
import { useToast } from "../../context/ToastContext";
import { useRanking } from "../../context/RankingContext";

const PlayerForm = ({ onClose, onPlayerCreated, playerToEdit }) => {
  const [image, setImage] = useState(playerToEdit?.image || "");
  const [name, setName] = useState(playerToEdit?.name || "");
  const fileInputRef = useRef(null);
  const { currentRanking } = useRanking();
  const {
    success: showSuccess,
    error: showError,
    warning: showWarning,
  } = useToast();

  const isEditMode = !!playerToEdit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      showWarning("Por favor, completa todos los campos.");
    } else {
      try {
        if (isEditMode) {
          const response = await updatePlayer(playerToEdit.id, {
            name,
            image,
          });
          const editedPlayer = {
            ...playerToEdit,
            ...response.data,
          };
          showSuccess("Jugador editado exitosamente.");
          onPlayerCreated(editedPlayer);
        } else {
          const newPlayer = await createPlayer({ name, image, rankingId: currentRanking?.id });
          showSuccess("Jugador creado exitosamente.");
          onPlayerCreated(newPlayer.data);
        }

        onClose();
      } catch (error) {
        console.error("Error al crear o editar jugador:", error);
        showError("Error al crear o editar el jugador. Intenta nuevamente.");
      }
    }
  };

  const handleImageSelect = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-white/10 border-2 border-dashed border-slate-400 dark:border-white/20 flex items-center justify-center overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt="Foto de perfil del jugador"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-4xl text-slate-400 dark:text-white/40">
                  person
                </span>
              )}
            </div>
            <button
              className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-lg border-4 border-background-light dark:border-background-dark"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="material-symbols-outlined text-xl">
                photo_camera
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Subir foto de perfil
          </p>
        </div>
        <FormInput
          label="Nombre del jugador"
          type="text"
          placeholder="Ej: Antonio"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="p-6 space-y-3 bg-gradient-to-t from-background-dark to-transparent">
        <SubmitButton
          text={isEditMode ? "Guardar cambios" : "Crear jugador"}
          fullWidth
        />
        <CancelButton text="Cancelar" fullWidth onClick={onClose} />
      </div>
    </form>
  );
};

PlayerForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPlayerCreated: PropTypes.func,
  playerToEdit: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    image: PropTypes.string,
  }),
};
export default PlayerForm;
