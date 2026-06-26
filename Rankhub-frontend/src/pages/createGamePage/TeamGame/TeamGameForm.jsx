import GameSelector from "../components/GameSelector";
import PropTypes from "prop-types";
import BotonCrearEquipo from "./components/BotonCrearEquipo";
import Team from "./components/Team";
import TeamCreateModal from "./components/TeamCreateModal";
import { useTeamGameForm } from "../hooks/useTeamGameForm";


function TeamGameForm({ onFormDataChange }) {
  const {
    setGameName,
    teamsState,
    isCreateTeamModalOpen,
    editingTeam,
    selectedPlayerIdsInTeams,
    moveTeam,
    deleteTeam,
    createTeam,
    updateTeam,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
  } = useTeamGameForm(onFormDataChange);

  return (
    <>
      <GameSelector onGameChange={setGameName} />

      <main className="px-4 pb-32">
        <div className="mt-6">
          <BotonCrearEquipo onClick={handleOpenCreateModal} />
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
              Teams in game
            </h2>
            <span className="text-xs font-medium text-slate-400">
              Total: {teamsState.length}
            </span>
          </div>
          <div className="space-y-4">
            {teamsState.map((team, index) => (
              <Team
                key={team.id}
                team={team}
                onEdit={() => handleOpenEditModal(team.id)}
                onDelete={() => deleteTeam(index)}
                onMoveDown={() => moveTeam(index, 1)}
                onMoveUp={() => moveTeam(index, -1)}
                disableMoveDown={index === teamsState.length - 1}
                disableMoveUp={index === 0}
              />
            ))}
          </div>
        </div>
      </main>

      {isCreateTeamModalOpen && (
        <TeamCreateModal
          onClose={handleCloseModal}
          onCreateTeam={editingTeam ? updateTeam : createTeam}
          existingSelectedPlayerIds={selectedPlayerIdsInTeams}
          initialTeam={editingTeam}
        />
      )}
    </>
  );
}

TeamGameForm.propTypes = {
  onFormDataChange: PropTypes.func,
};

TeamGameForm.defaultProps = {
  onFormDataChange: undefined,
};

export default TeamGameForm;
