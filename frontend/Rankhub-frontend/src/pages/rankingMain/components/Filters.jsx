function Filters() {
  return (
    <div className="px-4 py-3 bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-white/5">
      
      <div className="flex items-end gap-2">
        
        {/* Desde juego */}
        <div className="flex-1 min-w-0">
          <label htmlFor="from-game" className="block text-[10px] font-bold text-primary uppercase mb-1 ml-1">
            Desde juego
          </label>

          <select id="from-game" className="w-full bg-transparent border border-slate-300 dark:border-white/20 rounded-xl px-2 py-2 text-xs">
            <option>Juego 1</option>
            <option>Juego 2</option>
            <option>Juego 3</option>
            <option>Juego 4</option>
            <option>Juego 5</option>
          </select>
        </div>

        {/* Hasta juego */}
        <div className="flex-1 min-w-0">
          <label htmlFor="to-game" className="block text-[10px] font-bold text-primary uppercase mb-1 ml-1">
            Hasta juego
          </label>

          <select id="to-game" className="w-full bg-transparent border border-slate-300 dark:border-white/20 rounded-xl px-2 py-2 text-xs">
            <option>Juego 1</option>
            <option>Juego 2</option>
            <option>Juego 3</option>
            <option>Juego 4</option>
            <option>Juego 5</option>
          </select>
        </div>

        {/* Botones */}
        <div className="flex gap-1.5 shrink-0">
          
          <button
            type="button"
            className="h-[38px] w-10 flex items-center justify-center bg-primary text-background-dark rounded-xl active:scale-95 transition-transform"
            title="Aplicar"
          >
            <span className="material-symbols-outlined text-[20px]">
              check
            </span>
          </button>

          <button
            type="button"
            className="h-[38px] w-10 flex items-center justify-center border border-slate-300 dark:border-white/20 rounded-xl active:scale-95 transition-transform"
            title="Reestablecer"
          >
            <span className="material-symbols-outlined text-[20px]">
              refresh
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default Filters;