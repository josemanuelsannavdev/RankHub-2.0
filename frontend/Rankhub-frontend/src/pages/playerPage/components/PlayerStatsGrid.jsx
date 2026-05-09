import PropTypes from "prop-types";

const PlayerStatsGrid = ({ player }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {/* Games Played */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          Partidas Jugadas
        </p>
        <p className="text-3xl font-black text-primary">{player.gamesPlayed ?? 0}</p>
      </div>

      {/* Games Lost */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          Partidas último
        </p>
        <p className="text-3xl font-black text-red-400">{player.gamesLost ?? 0}</p>
      </div>

      {/* Win Rate */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm col-span-2 md:col-span-1">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          Partidas primero
        </p>
        <p className="text-3xl font-black text-emerald-400">{player.gamesWon ?? 0}</p>
      </div>
    </div>
  );
};

PlayerStatsGrid.propTypes = {
  player: PropTypes.shape({
    gamesPlayed: PropTypes.number,
    gamesLost: PropTypes.number,
    gamesWon: PropTypes.number,
  }).isRequired,
};

export default PlayerStatsGrid;