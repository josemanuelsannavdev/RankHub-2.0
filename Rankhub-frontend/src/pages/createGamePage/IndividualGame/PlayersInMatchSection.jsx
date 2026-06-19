import PlayerCard from "./PlayerCard";
import PropTypes from "prop-types";
import { usePlayerList } from "../hooks/usePlayerList";


function PlayersInMatchSection({
  title,
  players,
  onPlayersChange,
  onPlayerDelete,
}) {
  const { orderedPlayers, movePlayer, deletePlayer } = usePlayerList(
    players,
    onPlayersChange,
    onPlayerDelete,
  );

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
          {title}
        </h2>
        <span className="text-xs font-medium text-slate-400">
          Total: {orderedPlayers.length}
        </span>
      </div>

      <div className="space-y-3">
        {orderedPlayers.map((player, index) => {
          const position = index + 1;
          const points = Math.max(0, orderedPlayers.length - position);

          return (
            <PlayerCard
              key={player.name}
              name={player.name}
              points={points}
              position={position}
              avatarUrl={player.avatarUrl}
              onMoveUp={() => movePlayer(index, index - 1)}
              onMoveDown={() => movePlayer(index, index + 1)}
              onDelete={() => deletePlayer(index)}
              canMoveUp={index > 0}
              canMoveDown={index < orderedPlayers.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
}

PlayersInMatchSection.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      points: PropTypes.number,
      avatarUrl: PropTypes.string,
    }),
  ).isRequired,
  onPlayersChange: PropTypes.func,
  onPlayerDelete: PropTypes.func,
};

PlayersInMatchSection.defaultProps = {
  onPlayersChange: undefined,
  onPlayerDelete: undefined,
};

export default PlayersInMatchSection;
