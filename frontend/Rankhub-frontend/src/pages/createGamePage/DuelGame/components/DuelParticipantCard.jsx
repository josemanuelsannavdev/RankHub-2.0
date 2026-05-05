import PropTypes from "prop-types";

const participantVariants = {
  winner: {
    containerClass:
      "relative overflow-hidden bg-winner-green/5 border-2 border-winner-green/50 p-4 rounded-3xl flex items-center gap-4 shadow-[0_0_30px_rgba(34,197,94,0.1)]",
    avatarClass:
      "w-16 h-16 rounded-full bg-center bg-cover border-2 border-winner-green",
    tagClass:
      "text-[10px] font-bold text-winner-green uppercase tracking-widest mb-1 italic",
    nameClass: "text-lg font-extrabold leading-none text-white",
    subtitleClass: "text-xs text-slate-400 mt-1",
    closeClass: "text-slate-500 hover:text-red-500 p-2",
    badgeClass:
      "absolute -top-2 -right-2 bg-winner-green text-white rounded-full p-1 border-2 border-background-dark",
    badgeIcon: "trophy",
  },
  loser: {
    containerClass:
      "relative overflow-hidden bg-loser-red/5 border-2 border-loser-red/40 p-4 rounded-3xl flex items-center gap-4",
    avatarClass:
      "w-16 h-16 rounded-full bg-center bg-cover border-2 border-loser-red/60 grayscale-[0.5]",
    tagClass:
      "text-[10px] font-bold text-loser-red uppercase tracking-widest mb-1 italic",
    nameClass: "text-lg font-extrabold leading-none text-loser-red",
    subtitleClass: "text-xs text-slate-500 mt-1",
    closeClass: "text-slate-600 hover:text-red-500 p-2",
  },
};

function DuelParticipantCard({ type, name, subtitle, avatarUrl, onRemove }) {
  const variant = participantVariants[type];

  if (!variant) {
    return null;
  }

  return (
    <div className={variant.containerClass}>
      <div className="relative">
        {avatarUrl ? (
          <div
            className={variant.avatarClass}
            style={{ backgroundImage: `url('${avatarUrl}')` }}
          ></div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-500 ">
            <span className="material-symbols-outlined text-sm text-slate-400 ">
              person
            </span>
          </div>
        )}
        {variant.badgeClass ? (
          <div className={variant.badgeClass}>
            <span className="material-symbols-outlined text-sm font-bold block">
              {variant.badgeIcon}
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex-1">
        <p className={variant.tagClass}>
          {type === "winner" ? "Ganador" : "Perdedor"}
        </p>
        <h3 className={variant.nameClass}>{name}</h3>
        <p className={variant.subtitleClass}>{subtitle}</p>
      </div>
      <button type="button" className={variant.closeClass} onClick={onRemove}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}

DuelParticipantCard.propTypes = {
  type: PropTypes.oneOf(["winner", "loser"]).isRequired,
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};

DuelParticipantCard.defaultProps = {
  onRemove: undefined,
};

export default DuelParticipantCard;
