import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRanking } from "../../../context/RankingContext.jsx";
import { deleteGame, getGames } from "../../../services/gameApi";
import { normalizeGame } from "../utils/gameNormalization";
import { useToast } from "../../../context/ToastContext";

const allowedTypesByTab = {
  games: ["INDIVIDUAL_GAME", "TEAM_GAME"],
  duels: ["DUEL_GAME"],
};

const initialFilters = {
  activeTab: "games",
  activeFilter: "all",
  searchValue: "",
};

export const useViewGamesPage = () => {
  const navigate = useNavigate();
  const { currentRanking } = useRanking();
  const { success: showSuccess, error: showError , info: showInfo} = useToast();

  const [activeTab, setActiveTab] = useState(initialFilters.activeTab);
  const [activeFilter, setActiveFilter] = useState(initialFilters.activeFilter);
  const [searchValue, setSearchValue] = useState(initialFilters.searchValue);

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [gameOptionModalOpen, setGameOptionModalOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    let isActive = true;

    const fetchGames = async () => {
      if (!currentRanking?.id) {
        setGames([]);
        setLoading(false);
        setFetchError(null);
        setSelectedGameId(null);
        setGameOptionModalOpen(false);
        return;
      }

      setLoading(true);
      setFetchError(null);

      try {
        const response = await getGames(currentRanking.id);
        if (!isActive) return;
        setGames(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        if (!isActive) return;
        showError("Error al cargar los juegos. Por favor, inténtalo de nuevo.");
        setFetchError(error);
        setGames([]);
      } finally {
        if (!isActive) return;
        setLoading(false);
      }
    };

    fetchGames();

    return () => {
      isActive = false;
    };
  }, [currentRanking?.id]);

  const normalizedGames = useMemo(
    () => (games || []).map(normalizeGame),
    [games],
  );

  const filteredGames = useMemo(() => {
    const allowedTypes = allowedTypesByTab[activeTab] ?? allowedTypesByTab.games;
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    return normalizedGames.filter((game) => {
      const matchesTab = allowedTypes.includes(game.type);
      const matchesFilter =
        activeTab !== "games" ||
        activeFilter === "all" ||
        (activeFilter === "INDIVIDUAL_GAME" && game.type === "INDIVIDUAL_GAME") ||
        (activeFilter === "TEAM_GAME" && game.type === "TEAM_GAME");
      const matchesSearch = (game.name ?? "")
        .toLowerCase()
        .includes(normalizedSearchValue);

      return matchesTab && matchesFilter && matchesSearch;
    });
  }, [activeFilter, activeTab, normalizedGames, searchValue]);

  const selectedGame = useMemo(
    () => normalizedGames.find((game) => game.id === selectedGameId) ?? null,
    [normalizedGames, selectedGameId],
  );

  const clearFilters = useCallback(() => {
    setActiveFilter(initialFilters.activeFilter);
    setSearchValue(initialFilters.searchValue);
  }, []);

  const handleMenuClick = useCallback((gameId) => {
    setSelectedGameId(gameId);
    setGameOptionModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setGameOptionModalOpen(false);
    setSelectedGameId(null);
  }, []);

  const handleViewGameStats = useCallback(
    (game) => {
      navigate(`/gamePage/${game.id}`);
    },
    [navigate],
  );

  const handleEditGame = useCallback((game) => {
    showInfo("Funcionalidad de edición no implementada aún.");
  }, []);

  const handleDeleteGame = useCallback(
    async (game) => {
      if (!globalThis.confirm("¿Estás seguro de que deseas eliminar este juego?")) {
        return;
      }

      try {
        await deleteGame(game.id);
        setGames((previousGames) => previousGames.filter((currentGame) => currentGame.id !== game.id));
        showSuccess("Juego eliminado exitosamente.");
        handleCloseModal();
      } catch (error) {
        console.error(error);
        showError("Error al eliminar el juego. Por favor, inténtalo de nuevo.");
      }
    },
    [handleCloseModal, showSuccess, showError],
  );

  return {
    activeTab,
    setActiveTab,
    activeFilter,
    setActiveFilter,
    searchValue,
    setSearchValue,
    games: filteredGames,
    loading,
    fetchError,
    gameOptionModalOpen,
    selectedGame,
    clearFilters,
    handleMenuClick,
    handleViewGameStats,
    handleEditGame,
    handleDeleteGame,
    handleCloseModal,
  };
};