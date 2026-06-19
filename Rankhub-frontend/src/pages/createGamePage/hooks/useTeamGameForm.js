import { useState, useEffect, useCallback, useMemo } from "react";
import { useRanking } from "../../../context/RankingContext";
import { buildTeamsPayload } from "../utils/teamPayloadBuilder";

const createTeamId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `team-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const normalizeTeamPositions = (teams) =>
  teams.map((team, index) => ({
    ...team,
    position: index + 1,
  }));

export const useTeamGameForm = (onFormDataChange) => {
  const [gameName, setGameName] = useState("");
  const [teamsState, setTeamsState] = useState(() =>
    normalizeTeamPositions([]),
  );
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const { currentRanking } = useRanking();

  const editingTeam = useMemo(
    () => teamsState.find((team) => team.id === editingTeamId) || null,
    [teamsState, editingTeamId],
  );

  const selectedPlayerIdsInTeams = useMemo(() => {
    const idsSet = new Set();

    for (const team of teamsState) {
      if (team.id === editingTeamId) continue;

      const members = team?.members;
      if (!Array.isArray(members)) continue;

      for (const member of members) {
        const id = member?.id;
        if (id != null) {
          idsSet.add(String(id));
        }
      }
    }

    return [...idsSet];
  }, [teamsState, editingTeamId]);

  // Update parent when teams or game name changes
  useEffect(() => {
    if (onFormDataChange) {
      const teams = buildTeamsPayload(teamsState);
      onFormDataChange({
        name: gameName,
        rankingId: currentRanking?.id,
        teams,
        date: new Date().toISOString(),
      });
    }
  }, [gameName, onFormDataChange, teamsState, currentRanking?.id]);

  const moveTeam = useCallback((teamIndex, direction) => {
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
  }, []);

  const deleteTeam = useCallback((teamIndex) => {
    setTeamsState((currentTeams) =>
      normalizeTeamPositions(
        currentTeams.filter((_, index) => index !== teamIndex),
      ),
    );
  }, []);

  const createTeam = useCallback((newTeam) => {
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
  }, []);

  const updateTeam = useCallback(
    (updatedTeam) => {
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
    },
    [editingTeamId],
  );

  const handleOpenCreateModal = useCallback(() => {
    setEditingTeamId(null);
    setIsCreateTeamModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((teamId) => {
    setEditingTeamId(teamId);
    setIsCreateTeamModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsCreateTeamModalOpen(false);
    setEditingTeamId(null);
  }, []);

  return {
    gameName,
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
  };
};
