import { useCallback, useMemo, useState } from "react";

const normalizeSelectedPlayer = (selectedPlayer) => ({
	id: selectedPlayer?.id,
	name: selectedPlayer?.name || "Jugador",
	role: "Jugador",
	avatarUrl: selectedPlayer?.avatarUrl || selectedPlayer?.image,
});

export const useTeamCreate = ({
	onClose,
	onCreateTeam,
	existingSelectedPlayerIds = [],
	initialTeam = null,
}) => {
	const [teamName, setTeamName] = useState(initialTeam?.name || "");
	const [points, setPoints] = useState(initialTeam?.points || "");
	const [members, setMembers] = useState(initialTeam?.members || []);
	const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
	const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

	const isEditMode = Boolean(initialTeam);

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();

			if (!teamName.trim() || !points.trim()) {
				return;
			}

			onCreateTeam({
				name: teamName.trim(),
				points: points.trim(),
				members,
			});
		},
		[members, onCreateTeam, points, teamName],
	);

	const handlePlayerAdded = useCallback((selectedPlayer) => {
		const normalizedPlayer = normalizeSelectedPlayer(selectedPlayer);

		setMembers((currentMembers) => {
			const withoutDuplicate = currentMembers.filter(
				(member) => String(member.id) !== String(normalizedPlayer.id),
			);

			return [...withoutDuplicate, normalizedPlayer];
		});
	}, []);

	const handleGuestAdded = useCallback((guestName) => {
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
	}, []);

	const handleMemberRemoved = useCallback((memberToRemove) => {
		setMembers((currentMembers) =>
			currentMembers.filter((member) => {
				if (member?.id != null && memberToRemove?.id != null) {
					return String(member.id) !== String(memberToRemove.id);
				}

				return member.name !== memberToRemove?.name;
			}),
		);
	}, []);

	const selectedPlayerIdsForModal = useMemo(
		() => [
			...new Set([
				...existingSelectedPlayerIds,
				...members.map((member) => String(member.id)),
			]),
		],
		[existingSelectedPlayerIds, members],
	);

	const openPlayerModal = useCallback(() => {
		setIsPlayerModalOpen(true);
	}, []);

	const closePlayerModal = useCallback(() => {
		setIsPlayerModalOpen(false);
	}, []);

	const openGuestModal = useCallback(() => {
		setIsGuestModalOpen(true);
	}, []);

	const closeGuestModal = useCallback(() => {
		setIsGuestModalOpen(false);
	}, []);

	return {
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
	};
};
