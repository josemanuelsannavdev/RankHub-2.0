import PropTypes from 'prop-types';

function PlayerCard({
  name,
  points,
  avatarUrl,
  highlighted,
  onMoveUp,
  onMoveDown,
  onDelete,
  canMoveUp,
  canMoveDown,
  position,
}) {
  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl">
      <div>{position}.</div>
      {avatarUrl ? (
        <div
          className={'w-10 h-10 rounded-full bg-center bg-cover border-2 border-transparent'}
          style={{ backgroundImage: `url('${avatarUrl}')` }}
        ></div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-500 "  >
          <span className="material-symbols-outlined text-sm text-slate-400 ">person</span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="font-bold truncate text-sm">{name}</p>
        <p
          className={`text-[10px] font-medium `}
        >
          {points} points
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={!canMoveUp}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 enabled:hover:bg-green-400/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-winner-green"
        >
          <span className="material-symbols-outlined text-lg">arrow_upward</span>
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={!canMoveDown}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5  text-red-400 enabled:hover:bg-red-400/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed "
        >
          <span className="material-symbols-outlined text-lg">arrow_downward</span>
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-orange-400 hover:bg-orange-400/20 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </button>
      </div>
    </div>
  );
}

PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  avatarUrl: PropTypes.string,
  highlighted: PropTypes.bool,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  onDelete: PropTypes.func,
  canMoveUp: PropTypes.bool,
  canMoveDown: PropTypes.bool,
  position: PropTypes.number.isRequired,
};

PlayerCard.defaultProps = {
  avatarUrl: '',
  highlighted: false,
  onMoveUp: undefined,
  onMoveDown: undefined,
  onDelete: undefined,
  canMoveUp: true,
  canMoveDown: true,
};

export default PlayerCard;
