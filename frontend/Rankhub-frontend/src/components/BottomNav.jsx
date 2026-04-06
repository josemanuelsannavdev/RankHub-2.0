function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-white/10">
      <div className="flex justify-around items-center py-3">
        {/* Añadir jugador */}
        <button className="flex flex-col items-center text-primary">
          <span className="material-symbols-outlined text-[22px]">
            person_add
          </span>
          <span className="text-[10px] font-medium">Add Player</span>
        </button>

        {/* Historico */}
        <button className="flex flex-col items-center text-slate-500 dark:text-slate-400">
          <span className="material-symbols-outlined text-[22px]">history</span>
          <span className="text-[10px] font-medium">History</span>
        </button>

        {/* BOTÓN CENTRAL -> crear juego  */}
        <button className="relative -top-6 w-1/5 flex flex-col items-center">
          <div className="w-16 h-16 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-xl border-4 border-background-light dark:border-background-dark hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-3xl font-bold">
              add
            </span>
          </div>

          <span className="text-[8px] font-bold text-primary text-center uppercase mt-1">
            Create Game
          </span>
        </button>


        {/* Mostrar juegos */}
        <button className="flex flex-col items-center text-slate-500 dark:text-slate-400">
          <span className="material-symbols-outlined text-[22px]">
            sports_esports
          </span>
          <span className="text-[10px] font-medium">Show games</span>
        </button>

        {/* Duelos */}
        <button className="flex flex-col items-center text-slate-500 dark:text-slate-400">
          <span className="material-symbols-outlined text-[22px]">swords</span>
          <span className="text-[10px] font-medium">Show Duels</span>
        </button>
      </div>
    </div>
  );
}

export default BottomNav;
