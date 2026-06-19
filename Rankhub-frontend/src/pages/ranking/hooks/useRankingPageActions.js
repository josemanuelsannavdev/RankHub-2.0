import { useCallback, useState } from "react";

export const useRankingPageActions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const handleCreatePlayerButton = useCallback(() => {
    setEditingPlayer(null);
    setModalOpen(true);
  }, []);

  const handleEditPlayer = useCallback((player) => {
    setEditingPlayer(player);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return {
    modalOpen,
    editingPlayer,
    setModalOpen,
    handleCreatePlayerButton,
    handleEditPlayer,
    closeModal,
  };
};