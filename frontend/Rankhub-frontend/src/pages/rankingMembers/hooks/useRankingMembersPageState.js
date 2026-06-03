import { useState } from "react";

export const useRankingMembersPageState = () => {
  const [activeTab, setActiveTab] = useState("members");
  const [invitationModalOpen, setInvitationModalOpen] = useState(false);

  const openInvitationModal = () => {
    setInvitationModalOpen(true);
  };

  const closeInvitationModal = () => {
    setInvitationModalOpen(false);
  };

  return {
    activeTab,
    setActiveTab,
    invitationModalOpen,
    openInvitationModal,
    closeInvitationModal,
  };
};
