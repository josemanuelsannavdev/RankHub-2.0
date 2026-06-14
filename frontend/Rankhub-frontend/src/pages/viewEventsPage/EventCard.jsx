import PlayerCard from "./components/PlayerCard";

function EventCard({ event }) {
  const isHighlighted = event.status === "En Curso";
  const isOpacity = event.status === "Finalizado";

  const bluePlayers = [
    {
      id: 1,
      name: "Jugador Azul 1",
      points: 1200,
      avatarUrl: "https://example.com/avatar1.png",
    },
    {
      id: 2,
      name: "Jugador Azul 2",
      points: 1100,
      avatarUrl: "https://example.com/avatar2.png",
    },
  ];
  const redPlayers = [
    {
      id: 3,
      name: "Jugador Rojo 1",
      points: 1300,
      avatarUrl: "https://example.com/avatar3.png",
    },
    {
      id: 4,
      name: "Jugador Rojo 2",
      points: 1250,
      avatarUrl: "https://example.com/avatar4.png",
    },
  ];

  return (
    <div
      className={`bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm relative ${
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
                    dddjdj
                  </span>
                  <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">
                      schedule
                    </span>
                    jfjfjf
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold">sdfsdf</h3>
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
                key={String(player.id)}
                name={player.name}
                points={player.points ?? Math.max(0, 1200 - index * 100)}
                avatarUrl={player.avatarUrl}
                side="blue"
              />
            ))}
          </div>
          <p className="text-center font-medium text-blue-400">
            Cuota azul: x{event.blueOdds}
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
                key={String(player.id)}
                name={player.name}
                points={player.points ?? Math.max(0, 1300 - index * 50)}
                avatarUrl={player.avatarUrl}
                side="red"
              />
            ))}
          </div>
          <p className="text-center font-medium text-red-400">
            Cuota rojo: x{event.redOdds}
          </p>
        </section>
      </div>
      {/* Contenedor añadido para centrar el botón y darle separación superior */}
      <div className="flex justify-center mt-6">
        <button className="bg-primary hover:scale-105 text-black font-bold py-2 px-6 rounded-xl transition-colors">
          Inscribirse
        </button>
      </div>
    </div>
  );
}

export default EventCard;
