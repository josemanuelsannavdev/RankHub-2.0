/**
 * Hook to manage duel game form state and logic
 * Handles winner, loser, bet, and payload building
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRanking } from "../../../context/RankingContext";
import { buildDuelParticipantsPayload } from "../utils/duelPayloadBuilder";

const EMPTY_PARTICIPANT = {
  id: null,
  name: "Sin seleccionar",
  subtitle: "Selecciona un jugador",
  avatarUrl: "",
};

/**
 * Transform player to duel participant format
 * @param {Object} player - Player object
 * @param {string} fallbackSubtitle - Default subtitle
 * @returns {Object} Participant object
 */
const toDuelParticipant = (player, fallbackSubtitle) => ({
  name: player?.name || "Jugador",
  subtitle: fallbackSubtitle,
  avatarUrl: player?.avatarUrl || player?.image || "",
  id: player?.id,
});

/**
 * Custom hook for duel game form management
 * Encapsulates all state and handlers related to duel games
 *
 * @returns {Object} Form state and handlers
 */
export const useDuelGameForm = (onFormDataChange) => {
  const [gameName, setGameName] = useState("");
  const [bet, setBet] = useState("");
  const [winner, setWinner] = useState(EMPTY_PARTICIPANT);
  const [loser, setLoser] = useState(EMPTY_PARTICIPANT);
  const [selectorRole, setSelectorRole] = useState(null);
  const { currentRanking } = useRanking();

  const selectedPlayerIds = useMemo(
    () => [winner.id, loser.id].filter(Boolean).map(String),
    [winner.id, loser.id],
  );

  // Update parent when winner, loser, or bet changes
  useEffect(() => {
    if (onFormDataChange) {
      const participants = buildDuelParticipantsPayload(winner, loser, bet);
      onFormDataChange({
        name: gameName,
        rankingId: currentRanking?.id,
        participants,
      });
    }
  }, [bet, gameName, loser, onFormDataChange, winner, currentRanking?.id]);

  const handleBetChange = useCallback((event) => {
    setBet(event.target.value);
  }, []);

  const handleOpenSelector = useCallback((role) => {
    setSelectorRole(role);
  }, []);

  const handleCloseSelector = useCallback(() => {
    setSelectorRole(null);
  }, []);

  const handlePlayerAdded = useCallback(
    (player) => {
      if (selectorRole === "winner") {
        setWinner(toDuelParticipant(player, "Ganador seleccionado"));
      } else if (selectorRole === "loser") {
        setLoser(toDuelParticipant(player, "Perdedor seleccionado"));
      }
      handleCloseSelector();
    },
    [selectorRole],
  );

  const handleRemoveWinner = useCallback(() => {
    setWinner(EMPTY_PARTICIPANT);
  }, []);

  const handleRemoveLoser = useCallback(() => {
    setLoser(EMPTY_PARTICIPANT);
  }, []);

  return {
    gameName,
    setGameName,
    bet,
    setBet,
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
  };
};
