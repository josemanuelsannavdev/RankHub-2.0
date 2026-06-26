import PropTypes from "prop-types";
import GameNameFormModal from "./GameNameFormModal";
import { useGameSelector } from "../hooks/useGameSelector";

function GameSelector({ options, value, onGameChange }) {
  const {
    visibleGameNames,
    isLoading,
    modalGameNameOpen,
    selectedGameName,
    handleClickAddGame,
    handleCloseModal,
    handleGameChange,
    handleGameNameCreated,
  } = useGameSelector(options, value, onGameChange);

  return (
    <div className="mt-8">
      <label
        htmlFor="create-game-selector"
        className="text-sm font-semibold text-slate-400 mb-2 block px-1"
      >
        Select a Game
      </label>
      <div className="flex gap-3">
        <div className="flex-1 relative group">
          <select
            id="create-game-selector"
            value={selectedGameName}
            onChange={handleGameChange}
            className="w-full appearance-none rounded-2xl border border-white/10 bg-white/5 py-4 pl-4 pr-12 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
            style={{ colorScheme: "dark" }}
          >
            <option value="" className="bg-background-dark text-white">
              Select a game
            </option>
            {isLoading && (
              <option className="bg-background-dark text-white">
                Loading options...
              </option>
            )}
            {!isLoading && visibleGameNames.length === 0 && (
              <option className="bg-background-dark text-white">
                No games available
              </option>
            )}
            {!isLoading &&
              visibleGameNames.map((option) => (
                <option key={option} className="bg-background-dark text-white">
                  {option}
                </option>
              ))}
          </select>
        </div>
        <button
          type="button"
          className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex items-center justify-center border border-white/10 transition-colors"
          onClick={handleClickAddGame}
        >
          <span className="material-symbols-outlined text-primary">
            add_circle
          </span>
        </button>

        {modalGameNameOpen && (
          <GameNameFormModal
            onClose={handleCloseModal}
            onGameNameCreated={handleGameNameCreated}
          />
        )}
      </div>
    </div>
  );
}

GameSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onGameChange: PropTypes.func,
};

GameSelector.defaultProps = {
  value: "",
  onGameChange: undefined,
};

export default GameSelector;
