import RankingPlayer from "./RankingPlayer";
import PropTypes from "prop-types";

import { useRanking } from "../../context/RankingContext";

function RankingList({ restPlayers }) {
  const { currentRanking } = useRanking();
  const players = restPlayers || [];

  return (
    <section className="px-4">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">
          Tabla de Posiciones {currentRanking?.name || ""}
        </h2>
        
      </div>

      {players.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <h2 className="text-2xl font-semibold mb-4">
            No hay jugadores en este ranking
          </h2>
          <p className="text-gray-600">
            Crea más jugadores para verlos en esta tabla.
          </p>
        </div>
      ) : (
        <>
          {/* lista */}
          <div className="flex flex-col gap-3">
            {players.map((player, index) => (
              <RankingPlayer key={player.id} player={player} position={index + 4} />
            ))}
          </div>
        </>
      )}

    </section>
  );
}

RankingList.propTypes = {
  restPlayers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
};

export default RankingList;
