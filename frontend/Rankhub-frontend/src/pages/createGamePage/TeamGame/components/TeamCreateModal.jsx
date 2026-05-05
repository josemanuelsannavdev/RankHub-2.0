import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../../../../components/Modal";
import FormInput from "../../../../components/FormInput";
import SubmitButton from "../../../../components/SubmitButton";
import CancelButton from "../../../../components/CancelButton";
import ParticipantActions from "../../components/ParticipantActions";
import PlayerSelectModal from "../../components/PlayerSelectModal";
import GuestPlayerModal from "../../components/GuestPlayerModal";
import TeamMemberCard from "./TeamMemberCard";

function TeamCreateModal({ onClose, onCreateTeam, existingSelectedPlayerIds, initialTeam }) {
  const [teamName, setTeamName] = useState(initialTeam?.name || "");
  const [points, setPoints] = useState(initialTeam?.points || "");
  const [members, setMembers] = useState(initialTeam?.members || []);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const isEditMode = Boolean(initialTeam);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!teamName.trim() || !points.trim()) {
      return;
    }

    onCreateTeam({
      name: teamName.trim(),
      points: points.trim(),
      members,
    });
  };

  const handlePlayerAdded = (selectedPlayer) => {
    const normalizedPlayer = {
      id: selectedPlayer?.id,
      name: selectedPlayer?.name || "Jugador",
      role: "Jugador",
      avatarUrl: selectedPlayer?.avatarUrl || selectedPlayer?.image,
    };

    setMembers((currentMembers) => {
      const withoutDuplicate = currentMembers.filter(
        (member) => String(member.id) !== String(normalizedPlayer.id),
      );

      return [...withoutDuplicate, normalizedPlayer];
    });
  };

  const handleGuestAdded = (guestName) => {
    const trimmedName = guestName.trim();

    if (!trimmedName) {
      return;
    }

    setMembers((currentMembers) => [
      ...currentMembers,
      {
        id: `guest-${Date.now()}`,
        name: trimmedName,
        role: "Invitado",
      },
    ]);
    setIsGuestModalOpen(false);
  };

  const handleMemberRemoved = (memberToRemove) => {
    setMembers((currentMembers) =>
      currentMembers.filter((member) => {
        if (member?.id != null && memberToRemove?.id != null) {
          return String(member.id) !== String(memberToRemove.id);
        }

        return member.name !== memberToRemove?.name;
      }),
    );
  };

  const selectedPlayerIdsForModal = [
    ...new Set([
      ...existingSelectedPlayerIds,
      ...members.map((member) => String(member.id)),
    ]),
  ];

  return (
    <Modal
      title={isEditMode ? "Editar equipo" : "Crear equipo"}
      description={
        isEditMode
          ? "Actualiza el nombre, los puntos y los miembros del equipo."
          : "Define el nombre, los puntos y los miembros del nuevo equipo."
      }
    >
      <div className="flex-1 overflow-y-auto ">
        <form onSubmit={handleSubmit}>
          <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4">
            <FormInput
              label="Nombre del equipo"
              type="text"
              placeholder="Ej: Los Titanes"
              value={teamName}
              onChange={(event) => setTeamName(event.target.value)}
            />
            <FormInput
              label="Puntos"
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
                  onClick: () => setIsPlayerModalOpen(true),
                }}
                secondaryAction={{
                  icon: "group_add",
                  label: "Add Guest",
                  onClick: () => setIsGuestModalOpen(true),
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
            <SubmitButton text={isEditMode ? "Guardar cambios" : "Crear equipo"} />
            <CancelButton text="Cancelar" onClick={onClose} />
          </div>
        </form>
      </div>
      {isPlayerModalOpen && (
        <PlayerSelectModal
          onClose={() => setIsPlayerModalOpen(false)}
          onPlayerAdded={handlePlayerAdded}
          selectedPlayerIds={selectedPlayerIdsForModal}
        />
      )}

      {isGuestModalOpen && (
        <GuestPlayerModal
          onClose={() => setIsGuestModalOpen(false)}
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
