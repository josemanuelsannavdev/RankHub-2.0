import Header from "../../components/Header";
import BottomNavOneButton from "../../components/BottomNavOneButton";
import { useCallback } from "react";
import { useToast } from "../../context/ToastContext";
import RankingSection from "./RankingSection";
import RankingOptionsModal from "./RankingOptionsModal";
import RankingFormModal from "./RankingFormModal";
import { useMyRankings } from "./hooks/useMyRankings";
import { useMainPageActions } from "./hooks/useMainPageActions";

function MainPage() {
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
  } = useMainPageActions({ removeByRole, upsertByRole });

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

        <RankingSection
          title="ADMIN"
          badgeText="SECTION"
          badgeClassName="text-primary bg-primary/10 border-primary/20 text-primary"
          rankings={rankingsAdmin}
          variant="owner"
          onEntryClick={handleRankingClick}
          onOptionClick={handleOptionRanking}
        />
        <RankingSection
          title="SUBADMIN"
          badgeText="SECTION"
          badgeClassName="bg-slate-300/20 text-slate-300 border border-slate-300/35"
          rankings={rankingsSubAdmin}
          variant="subadmin"
          onEntryClick={handleRankingClick}
          onOptionClick={handleOptionRanking}
        />
        <RankingSection
          title="GUEST"
          badgeText="SECTION"
          badgeClassName="bg-[#cd7f32]/20 text-[#cd7f32] border border-[#cd7f32]/35"
          rankings={rankingsGuest}
          variant="guest"
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
        />
      )}
    </div>
  );
}

export default MainPage;
