import React from "react";
import { useParams } from "react-router-dom";
import { useRanking } from "../../context/RankingContext";
import Header from "../../components/Header";
import usePlayerPageData from "./hooks/usePlayerPageData";
import usePlayerPageCharts from "./hooks/usePlayerPageCharts";
import PlayerStatsGrid from "./components/PlayerStatsGrid";
import PositionDistributionSection from "./components/PositionDistributionSection";
import DuelSection from "./components/DuelSection";
import { useState } from "react";
import PlayerOptionsModal from "./components/PlayerOptionsModal";
import PlayerFormModal from "../ranking/components/PlayerFormModal";

function PlayerPage() {
  const { playerId: routePlayerId } = useParams();
  const { currentRanking } = useRanking();

  const playerId = routePlayerId || null;
  const { player, setPlayer, historicos, loading, error } = usePlayerPageData({
    playerId,
    currentRankingId: currentRanking?.id,
  });
  const { positionChartModel, duelChartModel } = usePlayerPageCharts({
    historicos,
    playerId,
  });

  const playerNameForHeader = player?.name || "Jugador";

  const [modalOpenOptions, setModalOpenOptions] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [playerFormModalOpen, setPlayerFormModalOpen] = useState(false);

  const handleOptionPlayer = () => {
    setModalOpenOptions(true);
  };

  const handleEditPlayer = (player) => {
    setPlayerToEdit(player);
    setModalOpenOptions(false);
    setPlayerFormModalOpen(true);
  };

  const handlePlayerUpdated = (updatedPlayer) => {
    if (updatedPlayer) {
      setPlayer(updatedPlayer);
    }

    setPlayerToEdit(null);
    setPlayerFormModalOpen(false);
  };
  return (
    <div className="bg-surface min-h-screen pb-24" aria-live="polite">
      {/* Ambient Lighting Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <Header title={playerNameForHeader} />

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-4xl mx-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-primary/30 rounded-full"></div>
            </div>
            <p className="text-slate-400 text-sm font-medium">
              Cargando datos del jugador...
            </p>
          </div>
        )}

        {error && !loading && (
          <div
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center"
            role="alert"
          >
            <p className="text-red-300 font-medium text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && player && (
          <>
            {/* Page Title */}
            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter neon-glow-text">
                {player.name || "Jugador"}
                <button
                  className={`transition-colors p-2 rounded-lg text-zinc-500 justify-self-end hover:text-zinc-700 active:bg-zinc-700/10 ml-4`}
                onClick={()=> handleOptionPlayer()}
                >
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </h1>

              <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
            </header>

            {modalOpenOptions && (
              <PlayerOptionsModal
                player={player}
                onEdit={handleEditPlayer}
                onClose={() => setModalOpenOptions(false)}
              />
            )}

            {playerFormModalOpen && (
              <PlayerFormModal
                playerToEdit={playerToEdit}
                onClose={() => {
                  setPlayerToEdit(null);
                  setPlayerFormModalOpen(false);
                }}
                onPlayerCreated={handlePlayerUpdated}
              />
            )}


            {/* Player Stats */}
            <section className="mb-10 space-y-6">
              <PlayerStatsGrid player={player} />
            </section>

            {/* Chart Section */}
            <PositionDistributionSection chartModel={positionChartModel} />

            {/* Duelos Section */}
            <DuelSection duelModel={duelChartModel} />
          </>
        )}
      </main>
    </div>
  );
}

export default PlayerPage;
