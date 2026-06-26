import GameSelector from "../components/GameSelector";
import ParticipantActions from "../components/ParticipantActions";
import PlayersInMatchSection from "./PlayersInMatchSection";
import PlayerSelectModal from "../components/PlayerSelectModal";
import GuestPlayerModal from "../components/GuestPlayerModal";
import PropTypes from "prop-types";
import { useIndividualGameForm } from "../hooks/useIndividualGameForm";


function IndividualGameForm({ onFormDataChange }) {
  const {
    players,
    setGameName,
    modalPlayerOpen,
    setModalPlayerOpen,
    modalGuestOpen,
    setModalGuestOpen,
    handleClickAddPlayer,
    handlePlayerAdded,
    handleClickAddGuest,
    handleGuestAdded,
    handlePlayerDeleted,
    handlePlayersChange,
  } = useIndividualGameForm(onFormDataChange);

  return (
    <>
      <GameSelector onGameChange={setGameName} />
      <ParticipantActions
        primaryAction={{
          icon: "person_add",
          label: "Add Player",
          onClick: handleClickAddPlayer,
        }}
        secondaryAction={{
          icon: "group_add",
          label: "Add Guest",
          onClick: handleClickAddGuest,
        }}
      />
      <PlayersInMatchSection
        title="Players in Game"
        players={players}
        onPlayersChange={handlePlayersChange}
        onPlayerDelete={handlePlayerDeleted}
      />
      {modalPlayerOpen && (
        <PlayerSelectModal
          onClose={() => setModalPlayerOpen(false)}
          onPlayerAdded={handlePlayerAdded}
          selectedPlayerIds={players.map((player) => String(player.id))}
        />
      )}
      {modalGuestOpen && (
        <GuestPlayerModal
          onClose={() => setModalGuestOpen(false)}
          onGuestAdded={handleGuestAdded}
        />
      )}
    </>
  );
}

IndividualGameForm.propTypes = {
  onFormDataChange: PropTypes.func,
};

IndividualGameForm.defaultProps = {
  onFormDataChange: undefined,
};

export default IndividualGameForm;
