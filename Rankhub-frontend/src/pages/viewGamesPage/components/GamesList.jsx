import IndividualGameCard from "./cards/IndividualGameCard";
import TeamGameCard from "./cards/TeamGameCard";
import DuelGameCard from "./cards/DuelGameCard";
import PropTypes from "prop-types";

const GamesList = ({ games, onMenuClick }) => {
  const isDuelList = games.length > 0 && games.every((game) => game.type === "DUEL_GAME");

  const renderGameCard = (game) => {
    if (isDuelList) {
      return (
        <DuelGameCard
          gameTitle={game.name}
          date={game.date}
          time={game.time}
          winner={game.winner}
          loser={game.loser}
          bet={game.bet}
          onMenuClick={() => onMenuClick(game.id)}
          winnerGuestName={game.winnerGuestName}
          loserGuestName={game.loserGuestName}
        />
      );
    }

    if (game.type === "TEAM_GAME") {
      return (
        <TeamGameCard
          gameTitle={game.name}
          date={game.date}
          time={game.time}
          teams={game.teams}
          onMenuClick={() => onMenuClick(game.id)}
        />
      );
    }
    
    return (
      <IndividualGameCard
        gameTitle={game.name}
        gameType={game.type}
        date={game.date}
        time={game.time}
        participants={game.participants}
        onMenuClick={() => onMenuClick(game.id)}
        isOpacity={game.isOpacity}
      />
    );
  };

  return (
    <section className="space-y-4">
      {games.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <p>No hay juegos para mostrar</p>
        </div>
      ) : (
        games.map((game) => (
          <div key={game.id}>
            {renderGameCard(game)}
          </div>
        ))
      )}
    </section>
  );
};

GamesList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

export default GamesList;
