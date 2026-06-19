import Header from "../../components/Header";
import GameTabSelector from "./components/GameTabSelector";
import GameFilters from "./components/GameFilters";
import GamesList from "./components/GamesList";
import DuelFilters from "./components/DuelFilters";
import GameOptionModal from "./components/GameOptionModal";
import { useViewGamesPage } from "./hooks/useViewGamesPage";

const ViewGamePage = () => {
  const {
    activeTab,
    setActiveTab,
    activeFilter,
    setActiveFilter,
    searchValue,
    setSearchValue,
    games: filteredGames,

    gameOptionModalOpen,
    selectedGame,
    clearFilters,
    handleMenuClick,
    handleViewGameStats,
    handleEditGame,
    handleDeleteGame,
    handleCloseModal,
  } = useViewGamesPage();

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      <Header title="Listado de Juegos" />

      <main className="pb-32 px-4">
        <GameTabSelector activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === "games" ? (
          <GameFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onClearFilters={clearFilters}
          />
        ) : (
          <DuelFilters
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onClearFilters={clearFilters}
          />
        )}
        <GamesList games={filteredGames} onMenuClick={handleMenuClick} />

        {gameOptionModalOpen && (
          <GameOptionModal
            game={
              selectedGame && typeof selectedGame === "object"
                ? selectedGame
                : filteredGames.find((g) => g.id === selectedGame)
            }
            onViewStats={handleViewGameStats}
            onEdit={handleEditGame}
            onDelete={handleDeleteGame}
            onClose={handleCloseModal}
          />
        )}
      </main>
    </div>
  );
};

export default ViewGamePage;
