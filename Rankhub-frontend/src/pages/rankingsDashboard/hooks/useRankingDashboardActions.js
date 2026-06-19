import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRanking } from "../../../context/RankingContext";
import { useToast } from "../../../context/ToastContext";
import { deleteRanking, exitRanking } from "../../../services/rankingApi";

export const useRankingDashboardActions = ({ removeByRole, upsertByRole }) => {
  const navigate = useNavigate();
  const { selectRanking } = useRanking();
  const { success: showSuccess, error: showError } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRanking, setEditingRanking] = useState(null);
  const [modalOpenOptions, setModalOpenOptions] = useState(false);
  const [optionRanking, setOptionRanking] = useState(null);

  const handleCreateRankingButton = () => {
    setEditingRanking(null);
    setModalOpen(true);
  };

  const handleEditRanking = (ranking) => {
    setEditingRanking(ranking);
    setModalOpenOptions(false);
    setModalOpen(true);
  };

  const handleRankingCreated = (newRanking) => {
    upsertByRole(newRanking);
  };

  const handleRankingClick = (ranking) => {
    selectRanking(ranking);
    navigate(`/ranking/${ranking.id}`);
  };

  const handleOptionRanking = (ranking) => {
    setOptionRanking(ranking);
    selectRanking(ranking);
    setModalOpenOptions(true);
  };

  const handleDeleteRanking = async (ranking) => {
    try {
      await deleteRanking(ranking.id);
      showSuccess("Ranking borrado");

      removeByRole(ranking);
      setModalOpenOptions(false);
    } catch (error) {
      console.error("Error al borrar el ranking:", error);
      showError("Error al borrar el ranking.");
    }
  };

  const handleExitRanking = async (ranking) => {
    try {
      await exitRanking(ranking.id);
      showSuccess("Has salido del ranking");

      removeByRole(ranking);
      setModalOpenOptions(false);
    } catch (error) {
      console.error("Error al borrar el ranking:", error);
      showError("Error al salir del ranking.");
    }
  };

  const handleMembersSection = (ranking) => {
    selectRanking(ranking);
    navigate(`/ranking/${ranking.id}/members`);
  };
  return {
    modalOpen,
    editingRanking,
    modalOpenOptions,
    optionRanking,
    setModalOpen,
    setModalOpenOptions,
    handleCreateRankingButton,
    handleEditRanking,
    handleRankingCreated,
    handleRankingClick,
    handleOptionRanking,
    handleDeleteRanking,
    handleExitRanking,
    handleMembersSection,
  };
};