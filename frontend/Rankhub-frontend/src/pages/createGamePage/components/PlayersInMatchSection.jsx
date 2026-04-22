import PlayerCard from './PlayerCard';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function PlayersInMatchSection({ title, totalLabel, players }) {
  const [orderedPlayers, setOrderedPlayers] = useState(players);

  useEffect(() => {
    setOrderedPlayers(players);
  }, [players]);

  const movePlayer = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= orderedPlayers.length) {
      return;
    }

    setOrderedPlayers((prevPlayers) => {
      const nextPlayers = [...prevPlayers];
      const [playerToMove] = nextPlayers.splice(fromIndex, 1);
      nextPlayers.splice(toIndex, 0, playerToMove);
      return nextPlayers;
    });
  };

  const deletePlayer = (indexToDelete) => {
    setOrderedPlayers((prevPlayers) =>
      prevPlayers.filter((_, currentIndex) => currentIndex !== indexToDelete)
    );
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
          {title}
        </h2>
        <span className="text-xs font-medium text-slate-400">{totalLabel}</span>
      </div>

      <div className="space-y-3">
        {orderedPlayers.map((player, index) => {
          const position = index + 1;
          const points = player.points ?? Math.max(0, orderedPlayers.length - position);

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
  totalLabel: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      points: PropTypes.number,
      avatarUrl: PropTypes.string,
    })
  ).isRequired,
};

export default PlayersInMatchSection;
