import React from "react";
import { useParams } from "react-router-dom";
import { useRanking } from "../../context/RankingContext";
import Header from "../../components/Header";
import useGamePageData from "./hooks/useGamePageData";
import useGamePageCharts from "./hooks/useGamePageCharts";
import PointsDistributionSection from "./components/PointsDistributionSection";

import { useState } from "react";

function GamePage() {
  const { gameId: routeGameId } = useParams();
  const { currentRanking } = useRanking();

  const gameId = routeGameId || null;

const { game, setGame, historicos, loading, error } = useGamePageData({
    gameId,
    currentRankingId: currentRanking?.id,
  });

const { positionChartModel } = useGamePageCharts({
    historicos,
    gameId,
  });

  return (
    <div className="bg-surface min-h-screen pb-24" aria-live="polite">
      {/* Ambient Lighting Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <Header title={game?.name || "Juego"} />

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

        {!loading && !error && game && (
          <>
            {/* Page Title */}
            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter neon-glow-text">
                {game.name || "Juego"}
                
              </h1>

              <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
            </header>

            {/* Charts */}
            <PointsDistributionSection chartModel={positionChartModel} />
          </>
        )}


      </main>
    </div>
  );
}

export default GamePage;
