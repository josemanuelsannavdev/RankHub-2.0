import PropTypes from "prop-types";
import "../../../styles/rankingMain/podium.css";

function Podium({ podiumPlayers }) {
  const first = podiumPlayers[0] || {};
  const second = podiumPlayers[1] || {};
  const third = podiumPlayers[2] || {};

  return (
    <section className="mt-[30px] px-4 pt-8 pb-12 flex items-end justify-center gap-2">
      {/* 2º puesto */}
      <div className="flex flex-col items-center flex-1 max-w-[120px]">
        <div className="relative mb-3">
          {second.image ? (
            <div
              className="w-16 h-16 rounded-full border-4 border-slate-400 overflow-hidden bg-center bg-cover"
              style={{
                backgroundImage: second.image ? `url(${second.image})` : "none",
              }}
            />
          ) : (
            <div className="w-16 h-16 bg-slate-700 rounded-full border-4 border-amber-700 flex items-center justify-center  border-dashed  ">
              <span className="material-symbols-outlined text-sm text-slate-400 ">
                person
              </span>
            </div>
          )}

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
            {second.gamesPlayed > 0
              ? `${Math.round((second.gamesWon / second.gamesPlayed) * 100)}%`
              : "0%"}{" "}
            wr.
          </span>
          <span className="text-slate-900 font-bold text-sm mt-1">
            {second.gamesPlayed > 0
              ? `${Math.round((second.gamesLost / second.gamesPlayed) * 100)}%`
              : "0%"}{" "}
            lr.
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
          {first.image ? (
            <div
              className="w-20 h-20 rounded-full border-4 border-primary overflow-hidden bg-center bg-cover"
              style={{
                backgroundImage: first.image ? `url(${first.image})` : "none",
              }}
            />
          ) : (
            <div className="w-16 h-16 bg-slate-700 rounded-full border-4 border-amber-700 flex items-center justify-center  border-dashed  ">
              <span className="material-symbols-outlined text-sm text-slate-400 ">
                person
              </span>
            </div>
          )}

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
            {first.gamesPlayed > 0
              ? `${Math.round((first.gamesWon / first.gamesPlayed) * 100)}%`
              : "0%"}{" "}
            wr.
          </span>
          <span className="text-slate-900 font-bold text-sm mt-1">
            {first.gamesPlayed > 0
              ? `${Math.round((first.gamesLost / first.gamesPlayed) * 100)}%`
              : "0%"}{" "}
            lr.
          </span>
        </div>

        <p className="mt-2 text-sm font-bold text-center truncate w-full">
          {first.name || "No hay Jugador"}
        </p>
      </div>

      {/* 3º puesto */}
      <div className="flex flex-col items-center flex-1 max-w-[120px]">
        <div className="relative mb-3">
          {third.image ? (
            <div
              className="w-16 h-16 rounded-full border-4 border-amber-700 overflow-hidden bg-center bg-cover"
              style={{
                backgroundImage: third.image ? `url(${third.image})` : "none",
              }}
            />
          ) : (
            <div className="w-16 h-16 bg-slate-700 rounded-full border-4 border-amber-700 flex items-center justify-center  border-dashed  ">
              <span className="material-symbols-outlined text-sm text-slate-400 ">
                person
              </span>
            </div>
          )}

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
            {third.gamesPlayed > 0
              ? `${Math.round((third.gamesWon / third.gamesPlayed) * 100)}%`
              : "0%"}{" "}
            wr.
          </span>
          <span className="text-slate-900 font-bold text-sm mt-1">
            {third.gamesPlayed > 0
              ? `${Math.round((third.gamesLost / third.gamesPlayed) * 100)}%`
              : "0%"}{" "}
            lr.
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
