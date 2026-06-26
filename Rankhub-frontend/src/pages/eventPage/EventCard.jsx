import PlayerCard from "./components/PlayerCard";
import { useNavigate } from "react-router-dom";
function EventCard({ event }) {
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
  return (
    
      <div className="grid grid-cols-2 gap-4 relative ">
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
                avatarUrl={player.image}
                side="blue"
              />
            ))}
          </div>
          <p className="text-center font-medium text-blue-400">
           Blue Odds: x{event.blueSide.odds}
          </p>
        </section>

        {/*<!-- Red Side Column -->*/}
        <section className="space-y-4">
          <div className="flex items-center  gap-3 px-1">
             <div className="w-4 h-8 bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.8)] rounded-full"></div>
            <h2 className="text-xl font-black uppercase tracking-widest text-red-500 neon-glow-red">
              RED SIDE
            </h2>
           
          </div>
          <div className="space-y-3">
            {redPlayers.map((player, index) => (
              <PlayerCard
                key={player.name}
                name={player.name}
                avatarUrl={player.image}
                side="red"
              />
            ))}
          </div>
          <p className="text-center font-medium text-red-400">
            Red Odds: x{event.redSide.odds}
          </p>
        </section>
      </div>
      
    
  );
}

export default EventCard;
