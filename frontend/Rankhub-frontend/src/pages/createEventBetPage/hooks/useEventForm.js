import { useState, useCallback, useMemo } from "react";
import {createEvent} from "../../../services/betApi";
import { useRanking } from "../../../context/RankingContext";

export const useEventForm = (onFormDataChange) => {
  const [gameName, setGameName] = useState("");
  const [bluePlayers, setBluePlayers] = useState([]);
  const [redPlayers, setRedPlayers] = useState([]);
  const [activeTeam, setActiveTeam] = useState(null);
  const { currentRanking } = useRanking();

  const handleCreateClick = () => {
    console.log("Crear evento");
    console.log("Nombre del juego:", gameName);
    console.log("Jugadores del lado azul:", bluePlayers);
    console.log("Jugadores del lado rojo:", redPlayers);

     
    createEvent({
      name: gameName,
      blueSidePlayers: bluePlayers,
      redSidePlayers: redPlayers,
      rankingId : currentRanking?.id,
    })
      .then((response) => {
        console.log("Evento creado con éxito:", response.data);
      })
      .catch((error) => {
        console.error("Error al crear el evento:", error);
      });
  };

  const selectedPlayerIds = useMemo(
    () => [...bluePlayers, ...redPlayers].map((player) => String(player.id)),
    [bluePlayers, redPlayers],
  );

  const handleOpenPlayerSelector = useCallback((team) => {
    setActiveTeam(team);
  }, []);

  const handleClosePlayerSelector = useCallback(() => {
    setActiveTeam(null);
  }, []);

  const handlePlayerAdded = useCallback(
    (player) => {
      if (!activeTeam || !player?.id) {
        return;
      }

      const normalizedPlayer = {
        ...player,
        avatarUrl: player?.avatarUrl || player?.image || "",
      };

      if (activeTeam === "blue") {
        setBluePlayers((currentPlayers) => {
          if (
            currentPlayers.some(
              (currentPlayer) =>
                String(currentPlayer.id) === String(normalizedPlayer.id),
            )
          ) {
            return currentPlayers;
          }

          return [...currentPlayers, normalizedPlayer];
        });
      }

      if (activeTeam === "red") {
        setRedPlayers((currentPlayers) => {
          if (
            currentPlayers.some(
              (currentPlayer) =>
                String(currentPlayer.id) === String(normalizedPlayer.id),
            )
          ) {
            return currentPlayers;
          }

          return [...currentPlayers, normalizedPlayer];
        });
      }

      setActiveTeam(null);
    },
    [activeTeam],
  );

  const handleDeletePlayer = useCallback((team, playerId) => {
    const removeById = (players) =>
      players.filter((player) => String(player.id) !== String(playerId));

    if (team === "blue") {
      setBluePlayers(removeById);
    }

    if (team === "red") {
      setRedPlayers(removeById);
    }
  }, []);

  return {
    gameName,
    setGameName,
    bluePlayers,
    redPlayers,
    activeTeam,
    handleOpenPlayerSelector,
    handleClosePlayerSelector,
    handlePlayerAdded,
    handleDeletePlayer,
    selectedPlayerIds,
    handleCreateClick,
  };
};
