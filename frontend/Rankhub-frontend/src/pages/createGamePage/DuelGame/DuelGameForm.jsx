import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import GameSelector from "../components/GameSelector";
import DuelBetInput from "./components/DuelBetInput";
import DuelParticipantActions from "./components/DuelParticipantActions";
import DuelParticipantsSection from "./components/DuelParticipantsSection";
import PlayerSelectModal from "../components/PlayerSelectModal";
import { useRanking } from "../../../context/RankingContext";

const EMPTY_PARTICIPANT = {
  id: null,
  name: "Sin seleccionar",
  subtitle: "Selecciona un jugador",
  avatarUrl: "",
};

const toDuelParticipant = (player, fallbackSubtitle) => ({
  name: player?.name || "Jugador",
  subtitle: fallbackSubtitle,
  avatarUrl: player?.avatarUrl || player?.image || "",
  id: player?.id,
});



function DuelGameForm({ onFormDataChange }) {
  const [gameName, setGameName] = useState("");
  const [bet, setBet] = useState("");
  const [winner, setWinner] = useState(EMPTY_PARTICIPANT);
  const [loser, setLoser] = useState(EMPTY_PARTICIPANT);
  const [selectorRole, setSelectorRole] = useState(null);
  const { currentRanking } = useRanking();

  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange({
        name: gameName,
        rankingId: currentRanking?.id,
        participants: {
          winnerId: winner?.id ?? null,
          loserId: loser?.id ?? null,
          bet,
        },
      });
    }
  }, [bet, gameName, loser, onFormDataChange, winner, currentRanking?.id]);

  const handleBetChange = (event) => {
    setBet(event.target.value);
  };

  const handleOpenSelector = (role) => {
    setSelectorRole(role);
  };

  const handleCloseSelector = () => {
    setSelectorRole(null);
  };

  const handlePlayerAdded = (player) => {
    if (selectorRole === "winner") {
      setWinner(toDuelParticipant(player, "Ganador seleccionado"));
    }

    if (selectorRole === "loser") {
      setLoser(toDuelParticipant(player, "Perdedor seleccionado"));
    }

    handleCloseSelector();
  };

  const handleRemoveWinner = () => {
    setWinner(EMPTY_PARTICIPANT);
  };

  const handleRemoveLoser = () => {
    setLoser(EMPTY_PARTICIPANT);
  };

  const selectedPlayerIds = [winner.id, loser.id].filter(Boolean).map(String);

  return (
    <>
      <GameSelector
        onGameChange={setGameName}
      />
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
