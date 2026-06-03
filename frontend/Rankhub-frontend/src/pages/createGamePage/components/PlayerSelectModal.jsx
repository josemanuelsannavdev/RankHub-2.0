import PropTypes from "prop-types";
import Modal from "../../../components/Modal";
import { usePlayerSelector } from "../hooks/usePlayerSelector";

function PlayerSelectModal({ onClose, onPlayerAdded, selectedPlayerIds }) {
  const { sortedPlayers, isLoading, selectedSet } = usePlayerSelector(
    selectedPlayerIds,
  );

  return (
    <Modal
      title="Añadir jugador"
      description="Selecciona un jugador del ranking para sumarlo a la partida."
    >
      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3">
        {isLoading && (
          <p className="text-sm text-slate-400">Cargando jugadores...</p>
        )}

        {!isLoading && sortedPlayers.length === 0 && (
          <p className="text-sm text-slate-400">
            No hay jugadores disponibles.
          </p>
        )}

        {!isLoading &&
          sortedPlayers.map((player) => {
            const playerId = String(player?.id);
            const alreadyAdded = selectedSet.has(playerId);

            return (
              <div
                key={playerId}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                {player?.image ? (
                  <div
                    className="h-10 w-10 rounded-full bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${player.image})`,
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-500 ">
                    <span className="material-symbols-outlined text-sm text-slate-400 ">
                      person
                    </span>
                  </div>
                )}

                <p className="flex-1 text-sm font-semibold text-white truncate">
                  {player?.name || "Jugador"}
                </p>
                <button
                  type="button"
                  className="rounded-xl border border-primary/40 bg-primary/20 px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-slate-400"
                  onClick={() => onPlayerAdded(player)}
                  disabled={alreadyAdded}
                >
                  {alreadyAdded ? "Añadido" : "Añadir"}
                </button>
              </div>
            );
          })}
      </div>

      <div className="p-6 bg-gradient-to-t from-background-dark to-transparent">
        <button
          type="button"
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}

PlayerSelectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPlayerAdded: PropTypes.func.isRequired,
  selectedPlayerIds: PropTypes.arrayOf(PropTypes.string),
};

PlayerSelectModal.defaultProps = {
  selectedPlayerIds: [],
};

export default PlayerSelectModal;
