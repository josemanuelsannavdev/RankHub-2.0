import { useEffect, useMemo, useState } from "react";
import { useRanking } from "../../../context/RankingContext";
import { getMyPlayers } from "../../../services/playerApi";

const getPlayerName = (player) => player?.name || "";

export const usePlayerSelector = (selectedPlayerIds = []) => {
	const [players, setPlayers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { currentRanking } = useRanking();

	useEffect(() => {
		let isMounted = true;

		const fetchPlayers = async () => {
			setIsLoading(true);

			try {
				if (!currentRanking?.id) {
					if (isMounted) {
						setPlayers([]);
					}
					return;
				}

				const response = await getMyPlayers(currentRanking.id);

				if (!isMounted) {
					return;
				}

				const playerList = Array.isArray(response?.data) ? response.data : [];
				setPlayers(playerList);
			} catch (error) {
				if (!isMounted) {
					return;
				}

				console.error("Error al cargar jugadores para el modal:", error);
				setPlayers([]);
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchPlayers();

		return () => {
			isMounted = false;
		};
	}, [currentRanking?.id]);

	const sortedPlayers = useMemo(() => {
		return players.toSorted((a, b) => {
			const nameA = getPlayerName(a);
			const nameB = getPlayerName(b);
			return nameA.localeCompare(nameB, "es", { sensitivity: "base" });
		});
	}, [players]);

	const selectedSet = useMemo(() => new Set(selectedPlayerIds), [selectedPlayerIds]);

	return {
		sortedPlayers,
		isLoading,
		selectedSet,
	};
};
