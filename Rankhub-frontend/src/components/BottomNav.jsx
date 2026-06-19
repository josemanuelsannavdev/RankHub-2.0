import React from "react";
import PropTypes from "prop-types";
import { useRanking } from "../context/RankingContext";
function BottomNav({
  addPlayerClick,
  createGameClick,
  viewGamesClick,
  viewHistoricoClick,
  viewBetsClick,
}) {
  const { currentRanking } = useRanking();

  const roleAdmin = currentRanking?.role === "ADMIN";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-white/10">
      <div className="flex justify-around items-center py-3">
        {/* Añadir jugador */}
        <button
          className="flex flex-col items-center text-primary transition-transform duration-150 enabled:hover:scale-105 enabled:active:scale-95 disabled:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={addPlayerClick}
          disabled={!roleAdmin}
        >
          <span className="material-symbols-outlined text-[22px]">
            person_add
          </span>
          <span className="text-[10px] font-medium">Add Player</span>
        </button>

        {/* Historico */}
        <button
          onClick={viewHistoricoClick}
          className="flex flex-col items-center text-primary transition-transform duration-150 enabled:hover:scale-105 enabled:active:scale-95 dark:text-primary"
        >
          <span className="material-symbols-outlined text-[22px]">history</span>
          <span className="text-[10px] font-medium">History</span>
        </button>

        {/* BOTÓN CENTRAL -> crear juego  */}
        <button
          className="relative -top-6 w-1/5 flex flex-col items-center group disabled:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={createGameClick}
          disabled={!roleAdmin}
        >
          <div className="w-16 h-16 bg-primary  text-background-dark rounded-full flex items-center justify-center shadow-xl border-4 border-background-light dark:border-background-dark hover:scale-105 transition-transform group-disabled:bg-slate-400">
            <span className="material-symbols-outlined text-3xl font-bold">
              add
            </span>
          </div>

          <span className="text-[8px] font-bold text-primary text-center uppercase mt-1 group-disabled:text-slate-400">
            Create Game
          </span>
        </button>

        {/* Mostrar juegos */}
        <button
          onClick={viewGamesClick}
          className="flex flex-col items-center text-primary transition-transform duration-150 enabled:hover:scale-105 enabled:active:scale-95 dark:text-primary"
        >
          <span className="material-symbols-outlined text-[22px]">
            sports_esports
          </span>
          <span className="text-[10px] font-medium">Show games and duels</span>
        </button>

        {/* Apuestas */}
        <button
          onClick={viewBetsClick}
          className="flex flex-col items-center text-primary transition-transform duration-150 enabled:hover:scale-105 enabled:active:scale-95 dark:text-primary"
        >
          <span className="material-symbols-outlined text-[22px]">
            finance_mode
          </span>
          <span className="text-[10px] font-medium">Bets</span>
        </button>
      </div>
    </div>
  );
}

BottomNav.propTypes = {
  addPlayerClick: PropTypes.func,
  createGameClick: PropTypes.func,
  viewGamesClick: PropTypes.func,
  viewHistoricoClick: PropTypes.func,
  viewBetsClick: PropTypes.func,
};

export default BottomNav;
