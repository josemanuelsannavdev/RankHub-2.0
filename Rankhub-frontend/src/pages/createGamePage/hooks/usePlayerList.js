
import { useState, useEffect, useCallback } from "react";


export const usePlayerList = (initialPlayers, onPlayersChange, onPlayerDelete) => {
  const [orderedPlayers, setOrderedPlayers] = useState(initialPlayers || []);

  useEffect(() => {
    setOrderedPlayers(initialPlayers || []);
  }, [initialPlayers]);

  const movePlayer = useCallback(
    (fromIndex, toIndex) => {
      if (toIndex < 0 || toIndex >= orderedPlayers.length) {
        return;
      }

      const nextPlayers = [...orderedPlayers];
      const [playerToMove] = nextPlayers.splice(fromIndex, 1);
      nextPlayers.splice(toIndex, 0, playerToMove);

      setOrderedPlayers(nextPlayers);

      if (onPlayersChange) {
        onPlayersChange(nextPlayers);
      }
    },
    [orderedPlayers, onPlayersChange],
  );

  const deletePlayer = useCallback(
    (indexToDelete) => {
      const deletedPlayer = orderedPlayers[indexToDelete];
      const nextPlayers = orderedPlayers.filter(
        (_, currentIndex) => currentIndex !== indexToDelete,
      );

      setOrderedPlayers(nextPlayers);

      if (onPlayersChange) {
        onPlayersChange(nextPlayers);
      }

      if (deletedPlayer && onPlayerDelete) {
        onPlayerDelete(deletedPlayer);
      }
    },
    [orderedPlayers, onPlayersChange, onPlayerDelete],
  );

  return {
    orderedPlayers,
    movePlayer,
    deletePlayer,
  };
};
