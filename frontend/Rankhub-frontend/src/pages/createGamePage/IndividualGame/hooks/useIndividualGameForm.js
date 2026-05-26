/**
 * Hook to manage individual game form state and logic
 * Handles players, game name, modals, and payload building
 */

import { useState, useEffect, useCallback } from "react";
import { useRanking } from "../../../../context/RankingContext";
import { buildParticipantsPayload } from "../../utils/participantPayloadBuilder";

/**
 * Custom hook for individual game form management
 * Encapsulates all state and handlers related to individual games
 *
 * @returns {Object} Form state and handlers
 */
export const useIndividualGameForm = (onFormDataChange) => {
  const [players, setPlayers] = useState([]);
  const [gameName, setGameName] = useState("");
  const [modalPlayerOpen, setModalPlayerOpen] = useState(false);
  const [modalGuestOpen, setModalGuestOpen] = useState(false);
  const { currentRanking } = useRanking();

  // Update parent when players or game name changes
  useEffect(() => {
    if (onFormDataChange) {
      const participants = buildParticipantsPayload(players);
      onFormDataChange({
        name: gameName,
        participants,
        rankingId: currentRanking?.id,
      });
    }
  }, [currentRanking?.id, gameName, onFormDataChange, players]);

  const handleClickAddPlayer = useCallback(() => {
    setModalPlayerOpen(true);
  }, []);

  const handlePlayerAdded = useCallback((selectedPlayer) => {
    const normalizedPlayer = {
      ...selectedPlayer,
      avatarUrl: selectedPlayer?.avatarUrl || selectedPlayer?.image,
    };

    setPlayers((currentPlayers) => {
      const withoutDuplicate = currentPlayers.filter(
        (player) => String(player.id) !== String(normalizedPlayer.id),
      );
      return [...withoutDuplicate, normalizedPlayer];
    });
    setModalPlayerOpen(false);
  }, []);

  const handleClickAddGuest = useCallback(() => {
    setModalGuestOpen(true);
  }, []);

  const handleGuestAdded = useCallback((guestName) => {
    const trimmedName = guestName.trim();
    if (!trimmedName) return;

    const guestPlayer = {
      id: `guest-${Date.now()}`,
      name: `Invitado: ${trimmedName}`,
      isGuest: true,
    };

    setPlayers((currentPlayers) => [...currentPlayers, guestPlayer]);
    setModalGuestOpen(false);
  }, []);

  const handlePlayerDeleted = useCallback((deletedPlayer) => {
    setPlayers((currentPlayers) =>
      currentPlayers.filter((player) => {
        if (player?.id != null && deletedPlayer?.id != null) {
          return String(player.id) !== String(deletedPlayer.id);
        }
        return player.name !== deletedPlayer?.name;
      }),
    );
  }, []);

  const handlePlayersChange = useCallback((nextPlayers) => {
    setPlayers(nextPlayers);
  }, []);

  return {
    players,
    gameName,
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
  };
};
