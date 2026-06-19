import PropTypes from "prop-types";
import GameSelector from "../components/GameSelector";
import DuelBetInput from "./components/DuelBetInput";
import DuelParticipantActions from "./components/DuelParticipantActions";
import DuelParticipantsSection from "./components/DuelParticipantsSection";
import PlayerSelectModal from "../components/PlayerSelectModal";
import { useDuelGameForm } from "../hooks/useDuelGameForm";


function DuelGameForm({ onFormDataChange }) {
  const {
    setGameName,
    bet,
    winner,
    loser,
    selectorRole,
    selectedPlayerIds,
    handleBetChange,
    handleOpenSelector,
    handleCloseSelector,
    handlePlayerAdded,
    handleRemoveWinner,
    handleRemoveLoser,
  } = useDuelGameForm(onFormDataChange);

  return (
    <>
      <GameSelector onGameChange={setGameName} />
      <main className="px-4 pb-32">
        <DuelBetInput value={bet} onChange={handleBetChange} />
        <DuelParticipantActions
          onAddWinner={() => handleOpenSelector("winner")}
          onAddLoser={() => handleOpenSelector("loser")}
        />
        <DuelParticipantsSection
          winner={winner}
          loser={loser}
          onRemoveWinner={handleRemoveWinner}
          onRemoveLoser={handleRemoveLoser}
        />
      </main>
      {selectorRole && (
        <PlayerSelectModal
          onClose={handleCloseSelector}
          onPlayerAdded={handlePlayerAdded}
          selectedPlayerIds={selectedPlayerIds}
        />
      )}
    </>
  );
}

DuelGameForm.propTypes = {
  onFormDataChange: PropTypes.func,
};

DuelGameForm.defaultProps = {
  onFormDataChange: undefined,
};

export default DuelGameForm;
