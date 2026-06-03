import { useCallback, useEffect, useState } from "react";
import { getMembers } from "../../../services/rankingApi.js";
import { getInvitations, sendInvitation as sendRankingInvitation } from "../../../services/invitationApi.js";

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

export const useRankingMembersData = ({ rankingId, onFetchError } = {}) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshData = useCallback(async () => {
    if (!rankingId) {
      setMembers([]);
     
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [membersResponse] = await Promise.all([
        getMembers(rankingId),
       
      ]);
      console.log("Members response:", membersResponse);
      setMembers(normalizeArray(membersResponse?.data));
    } catch (fetchError) {
      console.error("Error al cargar los datos del ranking:", fetchError);
      setError(fetchError);
      onFetchError?.(fetchError);
    } finally {
      setLoading(false);
    }
  }, [onFetchError, rankingId]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);


  return {
    members,
    loading,
    error,
    refreshData,
  };
};
