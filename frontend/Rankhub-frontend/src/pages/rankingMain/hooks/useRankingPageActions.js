import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";
import { useRanking } from "../../../context/RankingContext";
export const useRankingPageActions = () => {
  const navigate = useNavigate();
  const { selectRanking } = useRanking();
  const { success: showSuccess, error: showError } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [modalOpenOptions, setModalOpenOptions] = useState(false);
  const [optionPlayer, setOptionPlayer] = useState(null);

  const handleCreatePlayerButton = () => {
    setEditingPlayer(null);
    setModalOpen(true);
  };

  const handleEditPlayer = (player) => {
    setEditingPlayer(player);
    setModalOpenOptions(false);
    setModalOpen(true);
  };

  const handlePlayerCreated = (newPlayer) => {
  };

  /*Entrar en un player*/
  const handlePlayerClick = (player) => {
    selectRanking(ranking);
    navigate(`/ranking/${ranking.id}`);
  };

  const handleOptionPlayer = (player) => {
    setOptionPlayer(player);
    setModalOpenOptions(true);
  };

  const handleDeletePlayer = async (player) => {
    try {
      await deletePlayer(player.id);
      showSuccess("Jugador borrado");

      removeByRole(player);
      setModalOpenOptions(false);
    } catch (error) {
      console.error("Error al borrar el player:", error);
      showError("Error al borrar el player.");
    }
  };



  return {
    modalOpen,
    editingPlayer,
    modalOpenOptions,
    optionPlayer,
    setModalOpen,
    setModalOpenOptions,
    handleCreatePlayerButton,
    handleEditPlayer,
    handlePlayerCreated,
    handlePlayerClick,
    handleOptionPlayer,
    handleDeletePlayer,
  };
};