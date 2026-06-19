import PlayerCard from "./components/PlayerCard";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BetCard from "./components/BetCard";

function EventCard({ event, onFinish }) {
  const isHighlighted = event.status === "En Curso";
  const isOpacity = event.status === "Finalizado";

  const bluePlayers = event.blueSide.players || [];
  const redPlayers = event.redSide.players || [];
  const navigate = useNavigate();
  const splitGameDateTime = (rawDate) => {
    if (typeof rawDate !== "string" || rawDate.trim() === "") {
      return { date: "--", time: "--" };
    }

    const normalizedDate = rawDate.replace("T", " ").trim();
    const [date = "--", time = "--"] = normalizedDate.split(/\s+/);

    return {
      date,
      time: time.length > 5 ? time.slice(0, 5) : time,
    };
  };
  const handleFinishEvent = (winnerSideId) => {
    onFinish?.(event, winnerSideId);
  };

  return (
    <div
      className={`bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl mb-4 p-4 shadow-sm relative ${
        isHighlighted ? "border-l-4 border-l-primary" : ""
      } ${isOpacity ? "opacity-90" : ""}`}
    >
      <div className="grid grid-cols-2 gap-4 relative mt-4">
        <section className="col-span-2">
          <div className="flex justify-between items-start mb-4 pr-6">
            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                <span
                  className={`bg-blue-500/10 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase`}
                >
                  ACTIVO
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">
                      calendar_today
                    </span>
                    {splitGameDateTime(event.date).date}
                  </span>
                  <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">
                      schedule
                    </span>
                    {splitGameDateTime(event.date).time}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold">{event.gameName}</h3>
            </div>
          </div>
        </section>

        {/*<!-- Blue Side Column -->*/}
        <section className="space-y-4">
          <div className="flex items-center gap-3 px-1">
            <div className="w-4 h-8 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] rounded-full"></div>
            <h2 className="text-xl font-black uppercase tracking-widest text-blue-400 neon-glow-blue">
              BLUE SIDE
            </h2>
          </div>
          <div className="space-y-3">
            {bluePlayers.map((player, index) => (
              <PlayerCard
                key={String(player.name)}
                name={player.name}
                avatarUrl={player.avatarUrl}
                side="blue"
              />
            ))}
          </div>
          <p className="text-center font-medium text-blue-400">
            Cuota azul: x{event.blueSide.odds}
          </p>
        </section>

        {/*<!-- Red Side Column -->*/}
        <section className="space-y-4">
          <div className="flex items-center justify-end gap-3 px-1">
            <h2 className="text-xl font-black uppercase tracking-widest text-red-500 neon-glow-red">
              RED SIDE
            </h2>
            <div className="w-4 h-8 bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.8)] rounded-full"></div>
          </div>
          <div className="space-y-3">
            {redPlayers.map((player, index) => (
              <PlayerCard
                key={player.name}
                name={player.name}
                avatarUrl={player.avatarUrl}
                side="red"
              />
            ))}
          </div>
          <p className="text-center font-medium text-red-400">
            Cuota rojo: x{event.redSide.odds}
          </p>
        </section>
      </div>
      {/*Contenedor para las apuestas*/}
      {event.status !== "PENDING" && event.bets.length > 0 && (
      <section className="mt-6 space-y-4">
        <div className="flex items-center gap-3 px-1">
          <div className="w-4 h-8 bg-primary  rounded-full"></div>
          <h2 className="text-xl font-black uppercase tracking-widest text-primary neon-glow-blue">
            BETS
          </h2>
        </div>
        {event.bets.map((bet) =>
          bet.sideId === event.blueSide.id ? (
            <BetCard
              key={bet.id}
              bet={bet}
              side="blueSide"
            />
          ) : bet.sideId === event.redSide.id ? (
            <BetCard
              key={bet.id}
              bet={bet}
              side="redSide"
            />
          ) : null,
        )}
      </section>
      )}
      {/* Contenedor añadido para centrar el botón y darle separación superior */}
      {event.status === "PENDING" && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(`/eventPage/${event.id}`)}
            className="bg-primary hover:scale-105 text-black font-bold py-2 px-6 rounded-xl transition-colors"
          >
            Inscribirse
          </button>
        </div>
      )}
      {event.status === "CLOSED" && (
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => handleFinishEvent(event.blueSide.id)}
            className="bg-blue-500 hover:scale-105 text-white font-bold py-2 px-6 rounded-xl transition-colors"
          >
            Blues Win
          </button>

          <span className="mx-4 text-gray-500 font-bold"></span>
           <button
            type="button"
            onClick={() => handleFinishEvent(event.redSide.id)}
            className="bg-red-500 hover:scale-105 text-white font-bold py-2 px-6 rounded-xl transition-colors"
          >
            REDS Win
          </button>
        </div>
      )}
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onFinish: PropTypes.func,
};

export default EventCard;
