import PropTypes from "prop-types";
import "../../../styles/rankingMain/podium.css";
import { useNavigate } from "react-router-dom";
import PlayerAvatar from "./PlayerAvatar";
import { getPlayerRate } from "../utils/playerMetrics";

function Podium({ podiumPlayers }) {
  const first = podiumPlayers[0] || {};
  const second = podiumPlayers[1] || {};
  const third = podiumPlayers[2] || {};
  const navigate = useNavigate();

  return (
    <section className="mt-[30px] px-4 pt-8 pb-12 flex items-end justify-center gap-2">
      {/* 2º puesto */}
      <div className="flex flex-col items-center flex-1 max-w-[120px]">
        <div className="relative mb-3">
          <PlayerAvatar
            player={second}
            sizeClassName="w-16 h-16"
            borderClassName="border-slate-400"
            onClick={() => navigate(`/playerPage/${second.id}`)}
          />

          <div className="absolute -top-2 -right-2 bg-slate-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            2
          </div>
        </div>

        <div className="podium-gradient-2 w-full  rounded-t-lg flex flex-col items-center justify-start pt-3 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
            Silver
          </span>
          <span className="text-slate-900 font-bold text-sm mt-1">
            {second.points || 0} pts
          </span>
          <span className="text-slate-900 font-bold text-sm mt-1">
            {getPlayerRate(second.gamesPlayed, second.gamesWon)} wr.
          </span>
          <span className="text-slate-900 font-bold text-sm mt-1">
            {getPlayerRate(second.gamesPlayed, second.gamesLost)} lr.
          </span>
        </div>

        <p className="mt-2 text-xs font-semibold text-center truncate w-full">
          {second.name || "No hay Jugador"}
        </p>
      </div>

      {/* 1º puesto */}
      <div className="flex flex-col items-center flex-1 max-w-[140px] transform -translate-y-4">
        <div className="relative mb-3">
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 text-primary">
            <span
              className="material-symbols-outlined text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              emoji_events
            </span>
          </div>
          <PlayerAvatar
            player={first}
            sizeClassName="w-20 h-20"
            borderClassName="border-dark-primary"
            onClick={() => navigate(`/playerPage/${first.id}`)}
          />

          <div className="absolute -top-2 -right-2 bg-primary text-background-dark w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
            1
          </div>
        </div>
        <div className="podium-gradient-1 w-full h-36 rounded-t-lg flex flex-col items-center justify-start pt-4 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-background-dark">
            Gold
          </span>
          <span className="text-background-dark font-bold text-lg mt-1">
            {first.points || 0} pts
          </span>
          <span className="text-slate-900 font-bold text-sm mt-1">
            {getPlayerRate(first.gamesPlayed, first.gamesWon)} wr.
          </span>
          <span className="text-slate-900 font-bold text-sm mt-1">
            {getPlayerRate(first.gamesPlayed, first.gamesLost)} lr.
          </span>
        </div>

        <p className="mt-2 text-sm font-bold text-center truncate w-full">
          {first.name || "No hay Jugador"}
        </p>
      </div>

      {/* 3º puesto */}
      <div className="flex flex-col items-center flex-1 max-w-[120px]">
        <div className="relative mb-3">
          <PlayerAvatar
            player={third}
            sizeClassName="w-16 h-16"
            borderClassName="border-amber-700"
            onClick={() => navigate(`/playerPage/${third.id}`)}
          />

          <div className="absolute -top-2 -right-2 bg-amber-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            3
          </div>
        </div>
        <div className="podium-gradient-3 w-full rounded-t-lg flex flex-col items-center justify-start pt-3 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
            Bronze
          </span>
          <span className="text-white font-bold text-sm mt-1">
            {third.points || 0} pts
          </span>
          <span className="text-slate-900 font-bold text-sm mt-1">
            {getPlayerRate(third.gamesPlayed, third.gamesWon)} wr.
          </span>
          <span className="text-slate-900 font-bold text-sm mt-1">
            {getPlayerRate(third.gamesPlayed, third.gamesLost)} lr.
          </span>
        </div>

        <p className="mt-2 text-xs font-semibold text-center truncate w-full">
          {third.name || "No hay Jugador"}
        </p>
      </div>
    </section>
  );
}

Podium.propTypes = {
  podiumPlayers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      image: PropTypes.string,
      points: PropTypes.number,
    }),
  ).isRequired,
};

export default Podium;
