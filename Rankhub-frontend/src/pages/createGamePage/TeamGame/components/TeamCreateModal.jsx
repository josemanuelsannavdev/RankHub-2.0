import PropTypes from "prop-types";
import Modal from "../../../../components/Modal";
import FormInput from "../../../../components/FormInput";
import SubmitButton from "../../../../components/SubmitButton";
import CancelButton from "../../../../components/CancelButton";
import ParticipantActions from "../../components/ParticipantActions";
import PlayerSelectModal from "../../components/PlayerSelectModal";
import GuestPlayerModal from "../../components/GuestPlayerModal";
import TeamMemberCard from "./TeamMemberCard";
import { useTeamCreate } from "../../hooks/useTeamCreate";

function TeamCreateModal({ onClose, onCreateTeam, existingSelectedPlayerIds, initialTeam }) {
  const {
    teamName,
    setTeamName,
    points,
    setPoints,
    members,
    isEditMode,
    isPlayerModalOpen,
    isGuestModalOpen,
    selectedPlayerIdsForModal,
    handleSubmit,
    handlePlayerAdded,
    handleGuestAdded,
    handleMemberRemoved,
    openPlayerModal,
    closePlayerModal,
    openGuestModal,
    closeGuestModal,
  } = useTeamCreate({
    onClose,
    onCreateTeam,
    existingSelectedPlayerIds,
    initialTeam,
  });

  return (
    <Modal
      title={isEditMode ? "Edit Team" : "Create Team"}
      description={
        isEditMode
          ? "Update the team name, points, and members."
          : "Define the team name, points, and members for the new team."
      }
    >
      <div className="flex-1 overflow-y-auto ">
        <form onSubmit={handleSubmit}>
          <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4">
            <FormInput
              label="Team Name"
              type="text"
              placeholder="Ej: Los Titanes"
              value={teamName}
              onChange={(event) => setTeamName(event.target.value)}
            />
            <FormInput
              label="Points"
              type="number"
              placeholder="Ej: 1200"
              value={points}
              onChange={(event) => setPoints(event.target.value)}
            />

            <div className="pt-2">
              <ParticipantActions
                primaryAction={{
                  icon: "person_add",
                  label: "Add Player",
                  onClick: openPlayerModal,
                }}
                secondaryAction={{
                  icon: "group_add",
                  label: "Add Guest",
                  onClick: openGuestModal,
                }}
              />
            </div>

            <div className="space-y-3 pt-2">
              {members.map((member) => (
                <TeamMemberCard
                  key={`${member.id}-${member.name}`}
                  avatarUrl={member.avatarUrl}
                  name={member.name}
                  role={member.role}
                  onRemove={() => handleMemberRemoved(member)}
                />
              ))}
            </div>
          </div>

          <div className="p-6 space-y-3 bg-gradient-to-t from-background-dark to-transparent">
            <SubmitButton text={isEditMode ? "Save Changes" : "Create Team"} />
            <CancelButton text="Cancel" onClick={onClose} />
          </div>
        </form>
      </div>
      {isPlayerModalOpen && (
        <PlayerSelectModal
          onClose={closePlayerModal}
          onPlayerAdded={handlePlayerAdded}
          selectedPlayerIds={selectedPlayerIdsForModal}
        />
      )}

      {isGuestModalOpen && (
        <GuestPlayerModal
          onClose={closeGuestModal}
          onGuestAdded={handleGuestAdded}
        />
      )}
    </Modal>
  );
}

TeamCreateModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateTeam: PropTypes.func.isRequired,
  existingSelectedPlayerIds: PropTypes.arrayOf(PropTypes.string),
  initialTeam: PropTypes.shape({
    name: PropTypes.string,
    points: PropTypes.string,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        role: PropTypes.string,
        avatarUrl: PropTypes.string,
      }),
    ),
  }),
};

TeamCreateModal.defaultProps = {
  existingSelectedPlayerIds: [],
  initialTeam: null,
};

export default TeamCreateModal;
