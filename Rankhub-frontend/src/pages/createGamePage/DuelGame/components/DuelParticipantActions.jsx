import PropTypes from "prop-types";

function DuelParticipantActions({ onAddWinner, onAddLoser }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      <button
        type="button"
        className="flex flex-col items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-6 rounded-2xl transition-all group"
        onClick={onAddWinner}
      >
        <span className="material-symbols-outlined text-winner-green text-3xl group-hover:scale-110 transition-transform">
          emoji_events
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-winner-green">
          Add Winner
        </span>
      </button>

      <button
        type="button"
        className="flex flex-col items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-6 rounded-2xl transition-all group"
        onClick={onAddLoser}
      >
        <span className="material-symbols-outlined text-loser-red text-3xl group-hover:scale-110 transition-transform">
          thumb_down
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-loser-red">
          Add Loser
        </span>
      </button>
    </div>
  );
}

DuelParticipantActions.propTypes = {
  onAddWinner: PropTypes.func,
  onAddLoser: PropTypes.func,
};

DuelParticipantActions.defaultProps = {
  onAddWinner: undefined,
  onAddLoser: undefined,
};

export default DuelParticipantActions;