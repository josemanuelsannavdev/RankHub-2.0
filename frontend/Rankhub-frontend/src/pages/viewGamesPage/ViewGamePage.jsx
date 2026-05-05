import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import GameTabSelector from "./components/GameTabSelector";
import GameFilters from "./components/GameFilters";
import GamesList from "./components/GamesList";
import { useRanking } from "../../context/RankingContext.jsx";
import { getGames } from "../../services/gameApi";

const splitGameDateTime = (rawDate) => {
  if (typeof rawDate !== "string" || rawDate.trim() === "") {
    return { date: "--", time: "--" };
  }

  const normalizedDate = rawDate.replace("T", " ").trim();
  const [date = "--", time = "--"] = normalizedDate.split(/\s+/);

  return {
    date,
    time: time.length > 5 ? time.slice(0, 5) : time,
  };
};

const normalizePlayer = (player) => {
  if (!player) {
    return null;
  }

  if (typeof player === "string") {
    return { name: player, image: "" };
  }

  return {
    name: player.name ?? player.username ?? player.fullName ?? "Sin nombre",
    image: player.image ?? player.avatarUrl ?? player.photoUrl ?? "",
  };
};

const normalizeGame = (game) => {
  const { date, time } = splitGameDateTime(game?.date);
  const duelData = game?.participants ?? game?.duel ?? game?.result ?? {};

  return {
    ...game,
    date,
    time,
    winner: normalizePlayer(
      duelData.winner ?? game?.winner ?? game?.winnerPlayer ?? game?.winnerParticipant,
    ),
    loser: normalizePlayer(
      duelData.loser ?? game?.loser ?? game?.loserPlayer ?? game?.loserParticipant,
    ),
    bet: duelData.bet ?? game?.bet ?? game?.amount ?? null,
  };
};

const ViewGamePage = () => {
  const [activeTab, setActiveTab] = useState("games");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { currentRanking } = useRanking();

  useEffect(() => {
    let mounted = true;

    const fetchGames = async () => {
      if (!currentRanking?.id) {
        setGames([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setFetchError(null);

      try {
        const response = await getGames(currentRanking.id);
        if (!mounted) return;
        setGames(Array.isArray(response?.data) ? response.data : []);
      } catch (err) {
        if (!mounted) return;
        console.error("Error cargando juegos:", err);
        setFetchError(err);
        setGames([]);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchGames();

    return () => {
      mounted = false;
    };
  }, [currentRanking?.id]);

  const normalizedGames = useMemo(
    () => (games || []).map(normalizeGame),
    [games],
  );

  const filteredGames = useMemo(() => {
    const allowedTypes =
      activeTab === "duels"
        ? ["DUEL_GAME"]
        : ["INDIVIDUAL_GAME", "TEAM_GAME"];

    return normalizedGames.filter((game) => {
      const matchesTab = allowedTypes.includes(game.type);
      const matchesFilter =
        activeTab !== "games" ||
        activeFilter === "all" ||
        (activeFilter === "INDIVIDUAL_GAME" && game.type === "INDIVIDUAL_GAME") ||
        (activeFilter === "TEAM_GAME" && game.type === "TEAM_GAME");

      const matchesSearch = (game.name ?? "")
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      return matchesTab && matchesFilter && matchesSearch;
    });
  }, [activeFilter, activeTab, normalizedGames, searchValue]);

  const clearFilters = () => {
    setActiveFilter("all");
    setSearchValue("");
  };

  const handleMenuClick = (gameId) => {
    console.log("Menu clicked for game:", gameId);
    // TODO: Implementar lógica del menú
  };

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
          <section className="py-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Filtrar duelos
              </h2>
              <button
                onClick={clearFilters}
                className="text-xs font-bold text-primary flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">
                  filter_list_off
                </span>
                LIMPIAR
              </button>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                search
              </span>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:ring-primary focus:border-primary"
                placeholder="Buscar duelos por nombre..."
              />
            </div>
          </section>
        )}
        <GamesList games={filteredGames} onMenuClick={handleMenuClick} />
      </main>
    </div>
  );
};

export default ViewGamePage;
