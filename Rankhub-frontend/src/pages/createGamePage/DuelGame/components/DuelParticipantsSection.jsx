import PropTypes from "prop-types";
import DuelParticipantCard from "./DuelParticipantCard";

function DuelParticipantsSection({
  winner,
  loser,
  onRemoveWinner,
  onRemoveLoser,
}) {
  return (
    <div className="mt-10 relative">
      <div className="space-y-4">
        <DuelParticipantCard
          type="winner"
          name={winner.name}
          subtitle={winner.subtitle}
          avatarUrl={winner.avatarUrl}
          onRemove={onRemoveWinner}
        />
        <div className="flex justify-center">
          <div className="bg-background-dark border-2 border-primary w-12 h-12 rounded-full flex items-center justify-center italic font-black text-primary shadow-[0_0_20px_rgba(249,245,6,0.3)]">
            VS
          </div>
        </div>
        <DuelParticipantCard
          type="loser"
          name={loser.name}
          subtitle={loser.subtitle}
          avatarUrl={loser.avatarUrl}
          onRemove={onRemoveLoser}
        />
      </div>
    </div>
  );
}

DuelParticipantsSection.propTypes = {
  winner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  loser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveWinner: PropTypes.func,
  onRemoveLoser: PropTypes.func,
};

DuelParticipantsSection.defaultProps = {
  onRemoveWinner: undefined,
  onRemoveLoser: undefined,
};

export default DuelParticipantsSection;
