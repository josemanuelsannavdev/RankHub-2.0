import RankingItem from "./RankingItem";

import { useRanking } from "../../context/RankingContext";

function RankingList() {

  const { rankingData } = useRanking();

  return (
    <section className="px-4">
      
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Tabla de Posiciones {rankingData?.name || "Torneo"}</h2>
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