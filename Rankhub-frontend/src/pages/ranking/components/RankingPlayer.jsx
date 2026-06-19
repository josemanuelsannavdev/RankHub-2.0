import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React from "react";
import PlayerAvatar from "./PlayerAvatar";
import { getPlayerRate } from "../utils/playerMetrics";
function RankingPlayer({ player, position }) {
  const gamesPlayed = player?.gamesPlayed || 0;
  const gamesWon = player?.gamesWon || 0;
  const gamesLost = player?.gamesLost || 0;
  const points = player?.points ?? 0;
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 rounded-xl shadow-sm">
      {/* posición */}
      <div className="w-8 text-center text-slate-400 font-bold text-lg">
        {position}
      </div>
      <PlayerAvatar
        player={player}
        sizeClassName="w-12 h-12"
        borderClassName="border-slate-500"
        onClick={() => navigate(`/playerPage/${player.id}`)}
      />
      {/* info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold truncate">{player?.name || "Jugador"}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {gamesWon} Victorias • {gamesLost} Derrotas
        </p>
      </div>

      {/* puntos */}
      <div className="text-right">
        <p className="font-bold text-primary">{points} pts</p>
        <p className="text-[10px] text-green-500 font-bold flex items-center justify-end">
          <span className="material-symbols-outlined text-[12px]">
            trending_up
          </span>
          {getPlayerRate(gamesPlayed, gamesWon)} wr.
        </p>
        <p className="text-[10px] text-red-500 font-bold flex items-center justify-end">
          <span className="material-symbols-outlined text-[12px]">
            trending_down
          </span>
          {getPlayerRate(gamesPlayed, gamesLost)} lr.
        </p>
      </div>
    </div>
  );
}

RankingPlayer.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    image: PropTypes.string,
    points: PropTypes.number,
    gamesPlayed: PropTypes.number,
    gamesWon: PropTypes.number,
    gamesLost: PropTypes.number,
  }).isRequired,
  position: PropTypes.number.isRequired,
};

export default RankingPlayer;
