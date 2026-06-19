import GameCard from "./GameCard";
import GameTypeTag from "../shared/GameTypeTag";
import GameDateTime from "../shared/GameDateTime";
import TeamMembersList from "../shared/TeamMembersList";
import PropTypes from "prop-types";

const TeamGameCard = ({ gameTitle, date, time, teams, onMenuClick }) => {
  return (
    <GameCard onMenuClick={onMenuClick} isHighlighted={true}>
      <div className="flex justify-between items-start mb-4 pr-6">
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
            <GameTypeTag type="team" />
            <GameDateTime date={date} time={time} />
          </div>
          <h3 className="text-lg font-bold">{gameTitle}</h3>
        </div>
      </div>
      <div className="space-y-6 border-t border-slate-100 dark:border-white/5 pt-3">
        {teams.map((team, teamIndex) => (
          <div key={team.name} className="space-y-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold ${
                    teamIndex === 0 ? "text-primary" : "text-slate-400"
                  }`}
                >
                  #{teamIndex + 1}
                </span>
                <span
                  className={`font-bold text-sm tracking-wide ${
                    teamIndex === 0 ? "" : "opacity-80"
                  }`}
                >
                  {team.name}
                </span>
              </div>
              <span
                className={`text-sm font-black ${
                  teamIndex === 0 ? "text-primary" : "opacity-80"
                }`}
              >
                {team.points} pts
              </span>
            </div>
            <TeamMembersList
              members={team.members}
              isSecondTeam={teamIndex !== 0}
            />
          </div>
        ))}
      </div>
    </GameCard>
  );
};

TeamGameCard.propTypes = {
  gameTitle: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      points: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      members: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          image: PropTypes.string,
          guestName: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

export default TeamGameCard;
