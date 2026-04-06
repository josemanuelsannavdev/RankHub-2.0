import RankingItem from "./RankingItem";

function RankingList() {
  return (
    <section className="px-4">
      
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Tabla de Posiciones</h2>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Total: 42 Participantes
        </span>
      </div>

      {/* lista */}
      <div className="flex flex-col gap-3">
        <RankingItem />
        <RankingItem />
        <RankingItem />
      </div>

      {/* botón */}
      <button className="w-full mt-6 py-4 bg-slate-200 dark:bg-white/5 rounded-xl font-bold text-sm tracking-wide uppercase">
        Ver ranking completo
      </button>

    </section>
  );
}

export default RankingList;