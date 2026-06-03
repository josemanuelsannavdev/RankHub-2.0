import Header from "../../components/Header";
import BottomNavOneButton from "../../components/BottomNavOneButton";
import { useCallback, useMemo, useState } from "react";
import { useToast } from "../../context/ToastContext";
import RankingSection from "./components/RankingSection";
import RankingOptionsModal from "./components/RankingOptionsModal";
import RankingFormModal from "./components/RankingFormModal";
import { useMyRankings } from "./hooks/useMyRankings";
import { useRankingDashboardActions } from "./hooks/useRankingDashboardActions";

const ROLE_TAB_CONFIG = {
  admin: {
    title: "ADMIN",
    badgeText: "SECTION",
    badgeClassName: "text-primary bg-primary/10 border-primary/20 text-primary",
    variant: "owner",
    buttonClassName: "data-[active=true]:bg-primary/20 data-[active=true]:text-primary data-[active=true]:border-primary/40",
  },
  subadmin: {
    title: "SUBADMIN",
    badgeText: "SECTION",
    badgeClassName: "bg-slate-300/20 text-slate-300 border border-slate-300/35",
    variant: "subadmin",
    buttonClassName: "data-[active=true]:bg-slate-300/20 data-[active=true]:text-slate-200 data-[active=true]:border-slate-300/40",
  },
  guest: {
    title: "GUEST",
    badgeText: "SECTION",
    badgeClassName: "bg-[#cd7f32]/20 text-[#cd7f32] border border-[#cd7f32]/35",
    variant: "guest",
    buttonClassName: "data-[active=true]:bg-[#cd7f32]/20 data-[active=true]:text-[#cd7f32] data-[active=true]:border-[#cd7f32]/40",
  },
};

function MainPage() {
  const [activeTab, setActiveTab] = useState("admin");
  const { error: showError } = useToast();
  const handleFetchError = useCallback(() => {
    showError("Error al cargar los rankings. Intenta nuevamente.");
  }, [showError]);

  const {
    rankingsAdmin,
    rankingsSubAdmin,
    rankingsGuest,
    upsertByRole,
    removeByRole,
  } = useMyRankings({ onFetchError: handleFetchError });

  const {
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
      } = useRankingDashboardActions({ removeByRole, upsertByRole });

  const rankingsByTab = useMemo(
    () => ({
      admin: rankingsAdmin,
      subadmin: rankingsSubAdmin,
      guest: rankingsGuest,
    }),
    [rankingsAdmin, rankingsSubAdmin, rankingsGuest],
  );

  const currentTabConfig = ROLE_TAB_CONFIG[activeTab];

  return (
    <div className="bg-surface min-h-screen pb-24">
      {/* Ambient Lighting Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/*<TopNavbar /> */}
      <Header />
      {/*  Main Content */}
      <main className="pt-24 px-6 max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter neon-glow-text">
            YOUR RANKINGS
          </h1>
          <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
        </header>

        <div className="mb-8" role="tablist" aria-label="Ranking sections">
          <div className="inline-flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-low/50 p-1 backdrop-blur-sm">
            {Object.entries(ROLE_TAB_CONFIG).map(([key, config]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={activeTab === key}
                data-active={activeTab === key}
                onClick={() => setActiveTab(key)}
                className={`rounded-lg border border-transparent px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors ${config.buttonClassName}`}
              >
                {config.title}
              </button>
            ))}
          </div>
        </div>

        <RankingSection
          title={currentTabConfig.title}
          badgeText={currentTabConfig.badgeText}
          badgeClassName={currentTabConfig.badgeClassName}
          rankings={rankingsByTab[activeTab]}
          variant={currentTabConfig.variant}
          onEntryClick={handleRankingClick}
          onOptionClick={handleOptionRanking}
        />
      </main>

      {/*Bottom Navbar*/}
      <BottomNavOneButton
        onClick={handleCreateRankingButton}
        buttonTitle="Create Ranking"
      />
      {modalOpen && (
        <RankingFormModal
          rankingToEdit={editingRanking}
          onClose={() => setModalOpen(false)}
          onRankingCreated={handleRankingCreated}
        />
      )}
      {modalOpenOptions && (
        <RankingOptionsModal
          ranking={optionRanking}
          onEdit={handleEditRanking}
          onDelete={handleDeleteRanking}
          onExit={handleExitRanking}
          onClose={() => setModalOpenOptions(false)}
          onMembersSection={handleMembersSection}
        />
      )}
    </div>
  );
}

export default MainPage;
