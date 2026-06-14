import PropTypes from 'prop-types';

function PlayerCard({
  name,
  points,
  avatarUrl,
  highlighted,
  onDelete,
  side,
}) {
const sideColors = {
    blue: {
      border: 'border-blue-500/20',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
    },
    red: {
      border: 'border-red-600/20',
        text: 'text-red-500',
        bg: 'bg-red-600/10',
    },
  };
  
  return (

    <div className={`flex items-center gap-3 ${sideColors[side]?.bg} ${sideColors[side]?.border} p-3 rounded-2xl`}>
     
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
        <p className={`font-bold truncate text-sm ${sideColors[side]?.text}`}>
          {name}
        </p>
        <p
          className={`text-[10px] font-medium ${sideColors[side]?.text}`}
        >
          {points} puntos
        </p>
      </div>

      
    </div>
  );
}

PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  avatarUrl: PropTypes.string,
  highlighted: PropTypes.bool,
  onDelete: PropTypes.func,
};

PlayerCard.defaultProps = {
  avatarUrl: '',
  onDelete: undefined,
};

export default PlayerCard;
