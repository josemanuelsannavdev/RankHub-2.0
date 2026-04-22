import GameSelector from './GameSelector';
import ParticipantActions from './ParticipantActions';
import PlayersInMatchSection from './PlayersInMatchSection';

const players = [
	{
		name: 'Alejandro Sanz',
		avatarUrl:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuD8F-KcFmuOWH1i5HZjAtzq2DrDBYniYRvqF98TZdLtbrWhUhrsvVEU2HSIF_VcTEGz-JHHZCku5JNrJO1VXuP33o6zNT5XZ75sL7Ifol3AVt3yLM3py1AM51pGvGjHLYWObRc-qX7NxzQrxi67gRndHS2pRl6iluNPZxPkuja-PoOrtlNVoRe7MfX380cZX-J87HFIyInF5MccQUEeoqHXjdt2eB1ao-ZLEh7OgmpUc6DbfZ1RvE0U_BBb4yz4lbI4NzErEitM3qoq',
		highlighted: true,
	},
	{
		name: 'Mateo Lopez',
		avatarUrl:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDFf5OKeDf02EIwkYoF9LJnBiQGj3Kja2ZzK1ig8YxqSm2sThsCRoYyNcSWgoFwaNr9q02nlyBBKyAmv7peAh4d2wrHh5e0U8tiVd2ycn-m5RpuLYUQo_Nh3__7BRyqYRdV_g3j9wosS5GCGCmpKsr95_kTxSW_q3ld1aY0karmGR5dHWSX-ACIZJktWf45KmHizp8F1BLRss_-KlICWeAVvHPHoOoTDNo0uXz9mTh5K_Q6hqaXcqNH2I1qVM_jzz1pnAUbdIsYntUM',
	},
	{
		name: 'Invitado: Juan Pérez',
		isGuest: true,
	},
];

function IndividualGameForm() {
	return (
		<>
			<GameSelector/>
			<ParticipantActions
				primaryAction={{ icon: 'person_add', label: 'Anadir Jugador' }}
				secondaryAction={{ icon: 'group_add', label: 'Anadir Invitado' }}
			/>
			<PlayersInMatchSection
				title="Jugadores en Partida"
				totalLabel={`Total: ${players.length}`}
				players={players}
			/>
		</>
	);
}

export default IndividualGameForm;
