import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { getGameNames } from "../../../services/gameApi";
import { useRanking } from "../../../context/RankingContext";
import GameNameFormModal from "./GameNameFormModal";

function GameSelector({ options, value, onGameChange }) {
  const [gameNames, setGameNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentRanking } = useRanking();
  const [modalGameNameOpen, setModalGameNameOpen] = useState(false);
  const [internalSelectedGameName, setInternalSelectedGameName] = useState("");

  const getGameNameValue = (game) => {
    if (typeof game === "string") {
      return game;
    }

    if (game && typeof game === "object" && typeof game.name === "string") {
      return game.name;
    }

    return "";
  };

  useEffect(() => {
    let isMounted = true;

    const fetchGameNames = async () => {
      setIsLoading(true);

      try {
        const response = await getGameNames(currentRanking?.id);
        const gameNames = Array.isArray(response?.data)
          ? response.data.map(getGameNameValue).filter(Boolean)
          : [];
        setGameNames(
          gameNames.toSorted((a, b) =>
            a.localeCompare(b, "es", { sensitivity: "base" }),
          ),
        );
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error("Error al cargar juegos para el selector:", error);
        setGameNames([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchGameNames();

    return () => {
      isMounted = false;
    };
  }, [currentRanking?.id]);

  const visibleGameNames = useMemo(() => {
    if (gameNames.length > 0) {
      return gameNames;
    }

    return (options || [])
      .map(getGameNameValue)
      .filter(Boolean)
      .toSorted((a, b) =>
        a.localeCompare(b, "es", { sensitivity: "base" }),
      );
  }, [gameNames, options]);

  useEffect(() => {
    if (value) {
      setInternalSelectedGameName(value);
      return;
    }

    if (!internalSelectedGameName && visibleGameNames.length > 0) {
      const firstGameName = visibleGameNames[0];
      setInternalSelectedGameName(firstGameName);

      if (onGameChange) {
        onGameChange(firstGameName);
      }
    }
  }, [internalSelectedGameName, onGameChange, value, visibleGameNames]);

  

  const handleClickAddGame = () => {
    setModalGameNameOpen(true);
  };

  const handleGameNameCreated = (newGame) => {
    const newGameName = getGameNameValue(newGame);

    if (!newGameName) {
      return;
    }

    setGameNames((currentGameNames) => {
      const withoutDuplicate = currentGameNames.filter(
        (gameName) => gameName !== newGameName,
      );

      return [...withoutDuplicate, newGameName].toSorted((a, b) =>
        a.localeCompare(b, "es", { sensitivity: "base" }),
      );
    });
  };

  const handleGameChange = (event) => {
    const nextGameName = event.target.value;
    setInternalSelectedGameName(nextGameName);

    if (onGameChange) {
      onGameChange(nextGameName);
    }
  };

  const selectedGameName = value ?? internalSelectedGameName;

  return (
    <div className="mt-8">
      <label
        htmlFor="create-game-selector"
        className="text-sm font-semibold text-slate-400 mb-2 block px-1"
      >
        Seleccionar Juego
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
              Selecciona un juego
            </option>
            {isLoading && (
              <option className="bg-background-dark text-white">
                Cargando opciones...
              </option>
            )}
            {!isLoading && visibleGameNames.length === 0 && (
              <option className="bg-background-dark text-white">
                No hay juegos disponibles
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
            onClose={() => setModalGameNameOpen(false)}
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
