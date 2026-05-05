import GameSelector from "../components/GameSelector";
import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import BotonCrearEquipo from "./components/BotonCrearEquipo";
import Team from "./components/Team";
import TeamCreateModal from "./components/TeamCreateModal";
import { useRanking } from "../../../context/RankingContext";

const teams = [];

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const normalizeTeamPositions = (nextTeams) =>
  nextTeams.map((team, index) => ({
    ...team,
    position: index + 1,
  }));

const toTeamPayload = (currentTeams) => {
  return currentTeams.map((team, index) => {
    
    const members = (team.members || []).map((member) => {
      const memberIdValue = typeof member?.id === "string" ? member.id.trim() : "";
      const isValidUUID = UUID_REGEX.test(memberIdValue);
      const isGuest = member?.role === "Invitado" || memberIdValue.startsWith("guest-");

      if (isValidUUID && !isGuest) {
        return {
          playerId: memberIdValue,
          guestName: null,
        };
      }else{        return {
          playerId: null,
          guestName: member?.name || "Invitado",
        };
      }

      
    });

    return {
      name: team.name,
      position: team.position,
      points: team.points,
      members,
    };
  });
};

const createTeamId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `team-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function TeamGameForm({ onFormDataChange }) {
  const [gameName, setGameName] = useState("");
  const [teamsState, setTeamsState] = useState(() =>
    normalizeTeamPositions(teams),
  );
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const { currentRanking } = useRanking();

  const editingTeam = useMemo(
    () => teamsState.find((team) => team.id === editingTeamId) || null,
    [teamsState, editingTeamId],
  );

  const selectedPlayerIdsInTeams = useMemo(() => {
    const ids = teamsState
      .filter((team) => team.id !== editingTeamId)
      .flatMap((team) => team?.members || [])
      .map((member) => member?.id)
      .filter((id) => id != null)
      .map(String);

    return [...new Set(ids)];
  }, [teamsState, editingTeamId]);

  const moveTeam = (teamIndex, direction) => {
    setTeamsState((currentTeams) => {
      const targetIndex = teamIndex + direction;

      if (targetIndex < 0 || targetIndex >= currentTeams.length) {
        return currentTeams;
      }

      const nextTeams = [...currentTeams];
      [nextTeams[teamIndex], nextTeams[targetIndex]] = [
        nextTeams[targetIndex],
        nextTeams[teamIndex],
      ];

      return normalizeTeamPositions(nextTeams);
    });
  };

  const deleteTeam = (teamIndex) => {
    setTeamsState((currentTeams) =>
      normalizeTeamPositions(
        currentTeams.filter((_, index) => index !== teamIndex),
      ),
    );
  };

  const createTeam = (newTeam) => {
    setTeamsState((currentTeams) =>
      normalizeTeamPositions([
        ...currentTeams,
        {
          id: createTeamId(),
          ...newTeam,
        },
      ]),
    );
    setIsCreateTeamModalOpen(false);
    setEditingTeamId(null);
  };

  const updateTeam = (updatedTeam) => {
    setTeamsState((currentTeams) =>
      normalizeTeamPositions(
        currentTeams.map((team) => {
          if (team.id !== editingTeamId) {
            return team;
          }

          return {
            ...team,
            ...updatedTeam,
          };
        }),
      ),
    );
    setIsCreateTeamModalOpen(false);
    setEditingTeamId(null);
  };

  const handleOpenCreateModal = () => {
    setEditingTeamId(null);
    setIsCreateTeamModalOpen(true);
  };

  const handleOpenEditModal = (teamId) => {
    setEditingTeamId(teamId);
    setIsCreateTeamModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateTeamModalOpen(false);
    setEditingTeamId(null);
  };

  useEffect(() => {
    if (onFormDataChange) {
      const teams = toTeamPayload(teamsState);
      onFormDataChange({
        name: gameName,
        rankingId: currentRanking?.id,
        teams: teams,
        date: new Date().toISOString(),
      });
    }
  }, [gameName, onFormDataChange, teamsState, currentRanking?.id]);

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
              Equipos en Partida
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
