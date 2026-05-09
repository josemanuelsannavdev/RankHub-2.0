import { useCallback, useEffect, useState } from "react";
import { getMyRankings } from "../../../services/rankingApi";
import {
  groupRankingsByRole,
  removeRanking,
  upsertRanking,
} from "../../../services/rankingListHelpers";

export const useMyRankings = ({ onFetchError } = {}) => {
  const [rankingsAdmin, setRankingsAdmin] = useState([]);
  const [rankingsSubAdmin, setRankingsSubAdmin] = useState([]);
  const [rankingsGuest, setRankingsGuest] = useState([]);

  const applyRankings = useCallback((rankings) => {
    const groupedRankings = groupRankingsByRole(rankings || []);

    setRankingsAdmin(groupedRankings.admin);
    setRankingsSubAdmin(groupedRankings.subAdmin);
    setRankingsGuest(groupedRankings.guest);
  }, []);

  const refreshRankings = useCallback(async () => {
    try {
      const response = await getMyRankings();
      applyRankings(response.data);
    } catch (error) {
      console.error("Error al cargar rankings:", error);
      onFetchError?.(error);
    }
  }, [onFetchError]);

  useEffect(() => {
    refreshRankings();
  }, [refreshRankings]);

  const upsertByRole = useCallback((ranking) => {
    if (ranking.role === "ADMIN") {
      setRankingsAdmin((prev) => upsertRanking(prev, ranking));
      return;
    }

    if (ranking.role === "SUB_ADMIN") {
      setRankingsSubAdmin((prev) => upsertRanking(prev, ranking));
      return;
    }

    setRankingsGuest((prev) => upsertRanking(prev, ranking));
  }, []);

  const removeByRole = useCallback((ranking) => {
    if (ranking.role === "ADMIN") {
      setRankingsAdmin((prev) => removeRanking(prev, ranking.id));
      return;
    }

    if (ranking.role === "SUB_ADMIN") {
      setRankingsSubAdmin((prev) => removeRanking(prev, ranking.id));
      return;
    }

    setRankingsGuest((prev) => removeRanking(prev, ranking.id));
  }, []);

  return {
    rankingsAdmin,
    rankingsSubAdmin,
    rankingsGuest,
    refreshRankings,
    upsertByRole,
    removeByRole,
  };
};