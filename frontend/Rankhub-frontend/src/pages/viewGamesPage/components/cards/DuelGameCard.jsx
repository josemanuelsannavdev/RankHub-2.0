import GameTypeTag from "../shared/GameTypeTag";
import GameDateTime from "../shared/GameDateTime";
import PropTypes from "prop-types";

const DuelGameCard = ({
  gameTitle,
  date,
  time,
  winner,
  loser,
  bet,
  onMenuClick,
}) => {
  return (
    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm relative overflow-hidden">
      <button className="absolute top-4 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-10">
        <span className="material-symbols-outlined">more_vert</span>
      </button>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
        <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
          DUELO
        </span>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">
              calendar_today
            </span>{" "}
            {date}
          </span>
          <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">schedule</span>{" "}
            {time}
          </span>
        </div>
      </div>
      <h3 className="text-lg font-bold mb-4">{gameTitle}</h3>
      <div className="grid grid-cols-2 gap-4 mb-4 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-background-dark/80 dark:bg-background-dark border border-white/10 w-8 h-8 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-black italic text-primary">
              VS
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase text-winner-green flex items-center gap-1">
            <span
              className="material-symbols-outlined text-xs"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              emoji_events
            </span>{" "}
            Ganador
          </span>
          <div className="flex flex-col items-center gap-2 bg-winner-green/5 p-3 rounded-xl border border-winner-green">
            
            {winner?.image ? (
              <div
                className="w-12 h-12 rounded-full border-2 border-winner-green bg-cover bg-center"
                style={{
                  backgroundImage: winner?.image
                    ? `url('${winner.image}')`
                    : "none",
                }}
              ></div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-500 ">
                <span className="material-symbols-outlined text-sm text-slate-400 ">
                  person
                </span>
              </div>
            )}
            <span className="text-xs font-bold text-center text-winner-green">
              {winner?.name || "Jugador 1"}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase text-loser-red flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">close</span>{" "}
            Perdedor
          </span>
          <div className="flex flex-col items-center gap-2 bg-loser-red/5 p-3 rounded-xl border border-loser-red opacity-80">
            {loser?.image ? (
              <div
                className="w-12 h-12 rounded-full border-2 border-loser-red bg-cover bg-center"
                style={{
                  backgroundImage: loser?.image
                    ? `url('${loser.image}')`
                    : "none",
                }}
              ></div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-500 ">
                <span className="material-symbols-outlined text-sm text-slate-400 ">
                  person
                </span>
              </div>
            )}

            <span className="text-xs font-bold text-center text-loser-red">
              {loser?.name || "Jugador 2"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end pt-3 border-t border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold uppercase tracking-tight text-slate-500">
            Apuesta:
          </span>
          <span className="text-lg font-black text-primary">
            {" "}
            {bet || "0"} Pts
          </span>
        </div>
      </div>
    </div>
  );
};

DuelGameCard.propTypes = {
  gameTitle: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  winner: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }),
  loser: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }),
  bet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onMenuClick: PropTypes.func.isRequired,
};

DuelGameCard.defaultProps = {
  winner: null,
  loser: null,
  bet: null,
};

export default DuelGameCard;
