import { useCallback, useMemo } from "react";
import { cancelInvitation } from "../../../services/invitationApi.js";

const useInvitationSection = ({ invitations, onInvitationsUpdated }) => {
  const invitationList = useMemo(() => {
    return Array.isArray(invitations) ? invitations : [];
  }, [invitations]);

  const invitationSummary = useMemo(() => {
    if (invitationList.length === 0) {
      return "No invitations yet";
    }

    return `${invitationList.length} invitation${invitationList.length === 1 ? "" : "s"}`;
  }, [invitationList]);

  const handleCancelInvitation = useCallback(async (invitation) => {
    if (!invitation) {
      console.warn("No invitation provided for cancellation.");
      return;
    }

    try {
      await cancelInvitation(invitation?.id);
      await onInvitationsUpdated?.();
    } catch (error) {
      console.error("Error cancelling invitation:", error);
    }
  }, [onInvitationsUpdated]);

  return {
    invitationList,
    invitationSummary,
    handleCancelInvitation,
  };
};

export default useInvitationSection;
