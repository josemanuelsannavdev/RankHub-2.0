import PropTypes from "prop-types";
import FormInput from "../../../components/FormInput";
import SubmitButton from "../../../components/SubmitButton";
import CancelButton from "../../../components/CancelButton";
import { usePlayerForm } from "../hooks/usePlayerForm";

const PlayerForm = ({ onClose, onPlayerCreated, playerToEdit }) => {
  const {
    fileInputRef,
    image,
    name,
    isEditMode,
    handleSubmit,
    handleImageSelect,
    openFilePicker,
    setName,
  } = usePlayerForm({ playerToEdit, onPlayerCreated, onClose });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-white/10 border-2 border-dashed border-slate-400 dark:border-white/20 flex items-center justify-center overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt="Player profile"
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
              onClick={openFilePicker}
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
            Upload profile picture
          </p>
        </div>
        <FormInput
          label="Player name"
          type="text"
          placeholder="Ej: Antonio"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="p-4 space-y-3 bg-gradient-to-t from-background-dark to-transparent">
        <SubmitButton
          text={isEditMode ? "Save changes" : "Create player"}
          fullWidth
        />
        
        <CancelButton text="Cancel" fullWidth onClick={onClose} />
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
