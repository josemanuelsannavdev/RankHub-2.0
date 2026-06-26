import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useRanking } from "../../../context/RankingContext";
import usePlayerPageData from "./usePlayerPageData";
import usePlayerPageCharts from "./usePlayerPageCharts";

export default function usePlayerPage() {
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

  const [modalOpenOptions, setModalOpenOptions] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [playerFormModalOpen, setPlayerFormModalOpen] = useState(false);

  const openOptions = useCallback(() => setModalOpenOptions(true), []);
  const closeOptions = useCallback(() => setModalOpenOptions(false), []);

  const handleEditPlayer = useCallback((player) => {
    setPlayerToEdit(player);
    setModalOpenOptions(false);
    setPlayerFormModalOpen(true);
  }, []);

  const handlePlayerUpdated = useCallback(
    (updatedPlayer) => {
      if (updatedPlayer) setPlayer(updatedPlayer);
      setPlayerToEdit(null);
      setPlayerFormModalOpen(false);
    },
    [setPlayer]
  );

  const closePlayerForm = useCallback(() => {
    setPlayerToEdit(null);
    setPlayerFormModalOpen(false);
  }, []);

  const headerTitle = player?.name || "Player";

  return {
    headerTitle,
    player,
    positionChartModel,
    duelChartModel,
    loading,
    error,
    modalOpenOptions,
    openOptions,
    closeOptions,
    playerFormModalOpen,
    playerToEdit,
    closePlayerForm,
    handleEditPlayer,
    handlePlayerUpdated,
  };
}
