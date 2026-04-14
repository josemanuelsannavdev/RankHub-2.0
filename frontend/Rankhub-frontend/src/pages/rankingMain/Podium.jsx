import '../../styles/rankingMain/podium.css'

function Podium({ podiumPlayers }) {
  return (
    <section className="px-4 pt-8 pb-12 flex items-end justify-center gap-2">
      
      {/* 2º puesto */}
      <div className="flex flex-col items-center flex-1 max-w-[120px]">
        
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-full border-4 border-slate-400 overflow-hidden bg-center bg-cover"
            style={{
              backgroundImage:
                `url(${podiumPlayers[1]?.image})`
            }}
          />
          <div className="absolute -top-2 -right-2 bg-slate-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            2
          </div>
        </div>

        <div className="podium-gradient-2 w-full h-24 rounded-t-lg flex flex-col items-center justify-start pt-3 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
            Silver
          </span>
          <span className="text-slate-900 font-bold text-sm mt-1">
            {podiumPlayers[1]?.score || 0} pts
          </span>
        </div>

        <p className="mt-2 text-xs font-semibold text-center truncate w-full">
          {podiumPlayers[1]?.name || "No hay Jugador"}
        </p>
      </div>

      {/* 1º puesto */}
      <div className="flex flex-col items-center flex-1 max-w-[140px] transform -translate-y-4">
        
        <div className="relative mb-3">
          
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-primary">
            <span className="material-symbols-outlined text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}>
              emoji_events
            </span>
          </div>

          <div className="w-20 h-20 rounded-full border-4 border-primary overflow-hidden bg-center bg-cover"
            style={{
              backgroundImage:
                `url(${podiumPlayers[0]?.image})`
            }}
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
            {podiumPlayers[0]?.score || 0} pts
          </span>
        </div>

        <p className="mt-2 text-sm font-bold text-center truncate w-full">
          {podiumPlayers[0]?.name || "No hay Jugador"}
        </p>
      </div>

      {/* 3º puesto */}
      <div className="flex flex-col items-center flex-1 max-w-[120px]">
        
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-full border-4 border-amber-700 overflow-hidden bg-center bg-cover"
            style={{
              backgroundImage:
                `url(${podiumPlayers[2]?.image})`
            }}
          />
          <div className="absolute -top-2 -right-2 bg-amber-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            3
          </div>
        </div>

        <div className="podium-gradient-3 w-full h-20 rounded-t-lg flex flex-col items-center justify-start pt-3 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
            Bronze
          </span>
          <span className="text-white font-bold text-sm mt-1">
            {podiumPlayers[2]?.score || 0} pts
          </span>
        </div>

        <p className="mt-2 text-xs font-semibold text-center truncate w-full">
          {podiumPlayers[2]?.name || "No hay Jugador"}
        </p>
      </div>

    </section>
  );
}

export default Podium;