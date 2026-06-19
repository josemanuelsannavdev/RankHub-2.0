import { useCallback, useEffect, useState } from "react";
import { getMembers } from "../../../services/rankingApi.js";
import {
  getInvitations,
  sendInvitation as sendRankingInvitation,
} from "../../../services/invitationApi.js";

const normalizeArray = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.content)) {
    return payload.content;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
};

export const useRankingInvitationsData = ({ rankingId, onFetchError } = {}) => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshData = useCallback(async () => {
    if (!rankingId) {
      setInvitations([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [invitationsResponse] = await Promise.all([
        getInvitations(rankingId),
      ]);
      
      setInvitations(normalizeArray(invitationsResponse?.data.filter(inv => inv.status === "PENDING")));
    } catch (fetchError) {
      console.error("Error al cargar las invitaciones del ranking:", fetchError);
      setError(fetchError);
      onFetchError?.(fetchError);
    } finally {
      setLoading(false);
    }
  }, [onFetchError, rankingId]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const sendInvitation = useCallback(
    async (email) => {
      if (!rankingId) {
        throw new Error("Ranking not selected");
      }

      const response = await sendRankingInvitation(rankingId, email);
      await refreshData();
      return response;
    },
    [rankingId, refreshData],
  );

  return {
    invitations,
    loading,
    error,
    refreshData,
    sendInvitation,
  };
};
