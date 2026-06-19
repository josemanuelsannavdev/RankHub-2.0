import { useCallback } from "react";
import Header from "../../components/Header.jsx";
import BottomNavOneButton from "../../components/BottomNavOneButton.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useRanking } from "../../context/RankingContext.jsx";
import SectionSelector from "./components/SectionSelector.jsx";
import MembersSection from "./components/members/MembersSection.jsx";
import InvitationsSection from "./components/invitations/InvitationsSection.jsx";
import InvitationFormModal from "./components/invitations/InvitationFormModal.jsx";
import { useRankingMembersData } from "./hooks/useRankingMembersData.js";
import { useRankingMembersPageState } from "./hooks/useRankingMembersPageState.js";
import { useRankingInvitationsData } from "./hooks/useRankingInvitationsData.js";

const RankingMembersPage = () => {
  const {
    activeTab,
    setActiveTab,
    invitationModalOpen,
    openInvitationModal,
    closeInvitationModal,
  } = useRankingMembersPageState();

  const { currentRanking } = useRanking();
  const { error: showError } = useToast();

  const handleFetchError = useCallback(() => {
    showError("No se pudieron cargar los datos del ranking.");
  }, [showError]);

  const { members, loading, error, refreshData } = useRankingMembersData({
    rankingId: currentRanking?.id,
    onFetchError: handleFetchError,
  });

  const {
    invitations,
    refreshData: refreshInvitations,
    sendInvitation,
  } = useRankingInvitationsData({
    rankingId: currentRanking?.id,
    onFetchError: handleFetchError,
  });

  return (
    <div className="bg-surface min-h-screen pb-24 text-slate-900 dark:text-white">
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <Header title={currentRanking?.name || "Members List"} />

      <main className="pt-24 px-6 max-w-4xl mx-auto">
        <header className="mb-10 space-y-3">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter neon-glow-text">
            RANKING MEMBERS
          </h1>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </header>

        <SectionSelector activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "members" && (
          <MembersSection
            currentRanking={currentRanking}
            members={members}
            loading={loading}
            error={error}
            onRetry={refreshData}
          />
        )}

        {activeTab === "invitations" && (
          <InvitationsSection
            currentRanking={currentRanking}
            invitations={invitations}
            loading={loading}
            error={error}
            onRetry={refreshInvitations}
          />
        )}
      </main>

      <BottomNavOneButton
        onClick={openInvitationModal}
        buttonTitle="Invite Member"
        disabled={!currentRanking?.id}
      />

      {invitationModalOpen && (
        <InvitationFormModal
          onClose={closeInvitationModal}
          onSendInvitation={sendInvitation}
        />
      )}
    </div>
  );
};

export default RankingMembersPage;
