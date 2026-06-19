import { useCallback, useMemo, useState } from "react";
import Header from "../../components/Header";
import BottomNavOneButton from "../../components/BottomNavOneButton";
import GameSelector from "../createGamePage/components/GameSelector";
import PlayerSelectModal from "../createGamePage/components/PlayerSelectModal";
import PlayerCard from "./components/PlayerCard";
import { useEventForm } from "./hooks/useEventForm";


function CreateEventPage() {
  const buttonTitle = "Crear Evento";
  
  const {
    setGameName,
    bluePlayers,
    redPlayers,
    activeTeam,
    handleOpenPlayerSelector,
    handleClosePlayerSelector,
    handlePlayerAdded,
    handleDeletePlayer,
    handleCreateClick,
    selectedPlayerIds,  
  } = useEventForm();

  return (
    <div className="bg-surface min-h-screen pb-24">
      <Header title="Crear Evento" />

      <main className="px-4 pb-32">
        <GameSelector onGameChange={setGameName} />
        {/*<!-- Verses Layout (Bento Grid Style) -->*/}
        <div className="grid grid-cols-2 gap-4 relative mt-4">
          {/*<!-- Center VS Ornament -->*/}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-12 h-12 bg-surface flex items-center justify-center rounded-full border-2 border-outline-variant shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <span className="text-xs font-black italic text-on-surface tracking-tighter">
                VS
              </span>
            </div>
          </div>

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
                  onDelete={() => handleDeletePlayer("blue", player.id)}
                  side="blue"
                />
              ))}

              {/*<!-- Add Button -->*/}
              <button
                type="button"
                className="w-full py-4 border-2 border-dashed border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400/60 hover:text-blue-400 hover:border-blue-400/60 transition-all active:scale-95"
                onClick={() => handleOpenPlayerSelector("blue")}
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
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
                  onDelete={() => handleDeletePlayer("red", player.id)}
                  side="red"
                />
              ))}

              {/*<!-- Add Button -->*/}
              <button
                type="button"
                className="w-full py-4 border-2 border-dashed border-red-500/30 rounded-xl flex items-center justify-center text-red-500/60 hover:text-red-500 hover:border-red-500/60 transition-all active:scale-95"
                onClick={() => handleOpenPlayerSelector("red")}
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      {activeTeam && (
        <PlayerSelectModal
          onClose={handleClosePlayerSelector}
          onPlayerAdded={handlePlayerAdded}
          selectedPlayerIds={selectedPlayerIds}
        />
      )}

      <BottomNavOneButton
        onClick={handleCreateClick}
        buttonTitle={buttonTitle}
        disabled={false}
      />
    </div>
  );
}

export default CreateEventPage;
