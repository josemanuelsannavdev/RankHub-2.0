import { useCallback, useEffect, useMemo, useState } from "react";
import { useRanking } from "../../../context/RankingContext";
import { getGameNames } from "../../../services/gameApi";

const getGameNameValue = (game) => {
	if (typeof game === "string") {
		return game;
	}

	if (game && typeof game === "object" && typeof game.name === "string") {
		return game.name;
	}

	return "";
};

export const useGameSelector = (options, value, onGameChange) => {
	const [gameNames, setGameNames] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { currentRanking } = useRanking();
	const [modalGameNameOpen, setModalGameNameOpen] = useState(false);
	const [internalSelectedGameName, setInternalSelectedGameName] = useState("");

	useEffect(() => {
		let isMounted = true;

		const fetchGameNames = async () => {
			setIsLoading(true);

			try {
				const response = await getGameNames(currentRanking?.id);
				const nextGameNames = Array.isArray(response?.data)
					? response.data.map(getGameNameValue).filter(Boolean)
					: [];

				setGameNames(
					nextGameNames.toSorted((a, b) =>
						a.localeCompare(b, "es", { sensitivity: "base" }),
					),
				);
			} catch (error) {
				if (!isMounted) {
					return;
				}

				console.error("Error al cargar juegos para el selector:", error);
				setGameNames([]);
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchGameNames();

		return () => {
			isMounted = false;
		};
	}, [currentRanking?.id]);

	const visibleGameNames = useMemo(() => {
		if (gameNames.length > 0) {
			return gameNames;
		}

		return (options || [])
			.map(getGameNameValue)
			.filter(Boolean)
			.toSorted((a, b) =>
				a.localeCompare(b, "es", { sensitivity: "base" }),
			);
	}, [gameNames, options]);

	useEffect(() => {
		if (value) {
			setInternalSelectedGameName(value);
			return;
		}

		if (!internalSelectedGameName && visibleGameNames.length > 0) {
			const firstGameName = visibleGameNames[0];
			setInternalSelectedGameName(firstGameName);

			if (onGameChange) {
				onGameChange(firstGameName);
			}
		}
	}, [internalSelectedGameName, onGameChange, value, visibleGameNames]);

	const handleClickAddGame = useCallback(() => {
		setModalGameNameOpen(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setModalGameNameOpen(false);
	}, []);

	const handleGameNameCreated = useCallback((newGame) => {
		const newGameName = getGameNameValue(newGame);

		if (!newGameName) {
			return;
		}

		setGameNames((currentGameNames) => {
			const withoutDuplicate = currentGameNames.filter(
				(gameName) => gameName !== newGameName,
			);

			return [...withoutDuplicate, newGameName].toSorted((a, b) =>
				a.localeCompare(b, "es", { sensitivity: "base" }),
			);
		});
	}, []);

	const handleGameChange = useCallback(
		(event) => {
			const nextGameName = event.target.value;
			setInternalSelectedGameName(nextGameName);

			if (onGameChange) {
				onGameChange(nextGameName);
			}
		},
		[onGameChange],
	);

	const selectedGameName = value ?? internalSelectedGameName;

	return {
		visibleGameNames,
		isLoading,
		modalGameNameOpen,
		selectedGameName,
		handleClickAddGame,
		handleCloseModal,
		handleGameChange,
		handleGameNameCreated,
	};
};
