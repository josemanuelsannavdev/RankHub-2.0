import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../../../components/Modal";

function GuestPlayerModal({ onClose, onGuestAdded }) {
  const [guestName, setGuestName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!guestName.trim()) {
      return;
    }

    onGuestAdded(guestName);
    onClose();
  };

  return (
    <Modal
      title="Añadir invitado"
      description="Escribe el nombre para agregar un jugador invitado a la partida."
    >
      <form onSubmit={handleSubmit}>
        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4">
          <label
            htmlFor="guest-player-name"
            className="text-sm font-semibold text-slate-400 block"
          >
            Invitado:
          </label>
          <input
            id="guest-player-name"
            type="text"
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 px-4 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
            placeholder="Ej: Paco"
            
          />
        </div>

        <div className="p-6 space-y-3 bg-gradient-to-t from-background-dark to-transparent">
          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 text-sm font-bold uppercase tracking-wider text-background-dark hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!guestName.trim()}
          >
            Añadir
          </button>
          <button
            type="button"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}

GuestPlayerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onGuestAdded: PropTypes.func.isRequired,
};

export default GuestPlayerModal;
