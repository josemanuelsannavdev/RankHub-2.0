import GameSelector from '../components/GameSelector';
import ParticipantActions from '../components/ParticipantActions';
import PlayersInMatchSection from './PlayersInMatchSection';
import PlayerSelectModal from '../components/PlayerSelectModal';
import GuestPlayerModal from '../components/GuestPlayerModal';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRanking } from '../../../context/RankingContext';

const UUID_REGEX =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function IndividualGameForm({ onFormDataChange }) {
	const [players, setPlayers] = useState([]);
	const [gameName, setGameName] = useState('');
	const [modalPlayerOpen, setModalPlayerOpen] = useState(false);
	const [modalGuestOpen, setModalGuestOpen] = useState(false);
	const { currentRanking } = useRanking();

	const toParticipantPayload = (currentPlayers) => {
		return currentPlayers.map((player, index) => {
			const fallbackPoints = Math.max(0, currentPlayers.length - (index + 1));
			const points = fallbackPoints ;
			const rawName = (player?.name || '').trim();
			const guestName = rawName.replace(/^Invitado:\s*/i, '').trim();
			const playerIdValue =
				typeof player?.id === 'string' ? player.id.trim() : '';
			const hasValidPlayerId =
				!player?.isGuest && UUID_REGEX.test(playerIdValue);

			if (hasValidPlayerId) {
				return {
					playerId: playerIdValue,
					position: index + 1,
					points,
				};
			}

			return {
				guestName: guestName || 'Invitado',
				position: index + 1,
				points,
			};
		});
	};

	useEffect(() => {
		if (onFormDataChange) {
			const participants = toParticipantPayload(players);

			onFormDataChange({
				name: gameName,
				participants: participants,
				rankingId: currentRanking?.id,
			});
		}
	}, [currentRanking?.id, gameName, onFormDataChange, players]);

	const handleClickAddPlayer = () => {
		setModalPlayerOpen(true);
	};

	const handlePlayerAdded = (selectedPlayer) => {
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
	};

	const handleClickAddGuest = () => {
		setModalGuestOpen(true);
	};

	const handleGuestAdded = (guestName) => {
		const trimmedName = guestName.trim();

		if (!trimmedName) {
			return;
		}

		const guestPlayer = {
			id: `guest-${Date.now()}`,
			name: `Invitado: ${trimmedName}`,
			isGuest: true,
		};

		setPlayers((currentPlayers) => [...currentPlayers, guestPlayer]);
	};

	const handlePlayerDeleted = (deletedPlayer) => {
		setPlayers((currentPlayers) =>
			currentPlayers.filter((player) => {
				if (player?.id != null && deletedPlayer?.id != null) {
					return String(player.id) !== String(deletedPlayer.id);
				}

				return player.name !== deletedPlayer?.name;
			}),
		);
	};

	const handlePlayersChange = (nextPlayers) => {
		setPlayers(nextPlayers);
	};

	return (
		<>
			<GameSelector onGameChange={setGameName} />
			<ParticipantActions
				primaryAction={{
					icon: 'person_add',
					label: 'Anadir Jugador',
					onClick: handleClickAddPlayer,
				}}
				secondaryAction={{
					icon: 'group_add',
					label: 'Anadir Invitado',
					onClick: handleClickAddGuest,
				}}
			/>
			<PlayersInMatchSection
				title="Jugadores en Partida"
				players={players}
				onPlayersChange={handlePlayersChange}
				onPlayerDelete={handlePlayerDeleted}
			/>
			{modalPlayerOpen && (
				<PlayerSelectModal
					onClose={() => setModalPlayerOpen(false)}
					onPlayerAdded={handlePlayerAdded}
					selectedPlayerIds={players.map((player) => String(player.id))}
				/>
			)}
			{modalGuestOpen && (
				<GuestPlayerModal
					onClose={() => setModalGuestOpen(false)}
					onGuestAdded={handleGuestAdded}
				/>
			)}
		</>
	);
}

IndividualGameForm.propTypes = {
	onFormDataChange: PropTypes.func,
};

IndividualGameForm.defaultProps = {
	onFormDataChange: undefined,
};

export default IndividualGameForm;
