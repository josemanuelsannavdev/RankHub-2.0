import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

function GameSelector({ options }) {
  const [apiOptions, setApiOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchOptions = async () => {
      setIsLoading(true);

      try {
        const response = {
          data: [
            { id: "game-1", name: "FIFA 24" },
            { id: "game-2", name: "Padel Semanal" },
            { id: "game-3", name: "Torneo Ajedrez" },
            { id: "game-4", name: "Mesa de Ping Pong" },
          ],
        };
        const gameNames = Array.isArray(response?.data)
          ? response.data.map((game) => game.name)
          : [];
        setApiOptions(gameNames);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error("Error al cargar juegos para el selector:", error);
        setApiOptions([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleOptions = useMemo(() => {
    if (apiOptions.length > 0) {
      return apiOptions;
    }

    return options;
  }, [apiOptions, options]);

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
            className="w-full appearance-none rounded-2xl border border-white/10 bg-white/5 py-4 pl-4 pr-12 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
            style={{ colorScheme: "dark" }}
          >
            {isLoading && (
              <option className="bg-background-dark text-white">Cargando opciones...</option>
            )}
            {!isLoading && visibleOptions.length === 0 && (
              <option className="bg-background-dark text-white">No hay juegos disponibles</option>
            )}
            {!isLoading &&
              visibleOptions.map((option) => (
                <option key={option} className="bg-background-dark text-white">
                  {option}
                </option>
              ))}
          </select>

          
        </div>
        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex items-center justify-center border border-white/10 transition-colors">
          <span className="material-symbols-outlined text-primary">
            add_circle
          </span>
        </button>
      </div>
    </div>
  );
}

GameSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GameSelector;
