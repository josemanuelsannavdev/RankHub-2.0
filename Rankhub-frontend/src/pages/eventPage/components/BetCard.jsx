import PropTypes from "prop-types";
import { getSessionEmail } from "../../../services/session";
const sideColors = {
  blueSide: {
    border: "border-blue-500/20",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  redSide: {
    border: "border-red-600/20",
    text: "text-red-500",
    bg: "bg-red-600/10",
  },
};

function BetCard({ bet, side, onDelete }) {
  const sessionEmail = getSessionEmail();
  const handleDeleteClick = () => {
    const confirmDelete = globalThis.confirm(
      `Delete bet for ${bet.playerName}?`,
    );

    if (!confirmDelete) {
      return;
    }

    onDelete?.(bet.id);
  };

  return (
    <div
      className={`flex items-center gap-3 ${sideColors[side]?.bg} border ${sideColors[side]?.border} p-3 rounded-2xl`}
    >
      {bet.playerImage ? (
        <div
          className={
            "w-10 h-10 rounded-full bg-center bg-cover border-2 border-transparent"
          }
          style={{ backgroundImage: `url('${bet.playerImage}')` }}
        ></div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-500 ">
          <span className="material-symbols-outlined text-sm text-slate-400 ">
            person
          </span>
        </div>
      )}

      <div className="flex-1 min-w-0 flex justify-between items-center gap-2">
        <p className={`font-bold truncate text-sm ${sideColors[side]?.text}`}>
          {bet.playerName}
        </p>

        <p className={`font-bold truncate text-sm ${sideColors[side]?.text}`}>
          {side === "blueSide" ? "Blue Side" : "Red Side"}
        </p>

        <p className={`font-bold truncate text-sm ${sideColors[side]?.text}`}>
          {bet.points} points
        </p>
        <div className="flex items-center gap-1">
          {sessionEmail === bet.creatorName && (
            <button
              type="button"
              onClick={handleDeleteClick}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-orange-400 hover:bg-orange-400/20 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

BetCard.propTypes = {
  bet: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    playerName: PropTypes.string.isRequired,
    playerImage: PropTypes.string,
    points: PropTypes.number,
    creatorName: PropTypes.string,
  }).isRequired,
  side: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default BetCard;
