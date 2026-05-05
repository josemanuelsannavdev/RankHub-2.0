import GameCard from "./GameCard";
import GameTypeTag from "../shared/GameTypeTag";
import GameDateTime from "../shared/GameDateTime";

const IndividualGameCard = ({
  gameTitle,
  gameType = "individual",
  date,
  time,
  participants,
  onMenuClick,
  isOpacity = false,
}) => {
  return (
    <GameCard onMenuClick={onMenuClick} isOpacity={isOpacity}>
      <div className="flex justify-between items-start mb-4 pr-6">
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
            <GameTypeTag type={gameType} />
            <GameDateTime date={date} time={time} />
          </div>
          <h3 className="text-lg font-bold">{gameTitle}</h3>
        </div>
      </div>
      <div className="border-t border-slate-100 dark:border-white/5 pt-3">
        <div className="flex flex-col gap-2">
          {participants.map((participant, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    index === 0
                      ? "bg-primary text-background-dark"
                      : "bg-slate-200 dark:bg-white/10"
                  }`}
                >
                  {index + 1}
                </span>

                <div
                  key={index}
                  className={`inline-flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 max-w-max whitespace-nowrap`}
                >
                  {participant.player && participant.player.image ? (
                  <div
                    className="w-6 h-6 rounded-full bg-cover flex-shrink-0"
                    style={{
                      backgroundImage: participant.player.image
                        ? `url('${participant.player.image}')`
                        : "none",
                      backgroundColor: participant.player.image
                        ? "transparent"
                        : "#cbd5e1",
                    }}
                  ></div>) : (
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-500 ">
                      <span className="material-symbols-outlined text-sm text-slate-400 ">
                        person
                      </span>
                    </div>
                  )}
                  <span className="text-[11px] font-medium">
                    {participant.player?.name || participant.guestName}
                  </span>
                </div>
              </div>
              <span
                className={`font-bold ${index === 0 ? "text-primary" : ""}`}
              >
                {participant.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </GameCard>
  );
};

export default IndividualGameCard;
