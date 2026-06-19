import PropTypes from "prop-types";
import RankingCard from "./RankingCard";

function RankingSection({ title, badgeText, badgeClassName, rankings, variant, onEntryClick, onOptionClick }) {
  return (
    <section className="mb-12">
      {(!rankings || rankings.length === 0) ? (
        <p className="text-center text-gray-500">No rankings — try creating one.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {rankings.map((ranking) => (
            <RankingCard
              key={ranking.id}
              ranking={ranking}
              variant={variant}
              onClickEntry={() => onEntryClick(ranking)}
              onClickOption={() => onOptionClick(ranking)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

RankingSection.propTypes = {
  title: PropTypes.string.isRequired,
  badgeText: PropTypes.string.isRequired,
  badgeClassName: PropTypes.string.isRequired,
  rankings: PropTypes.array.isRequired,
  variant: PropTypes.oneOf(["owner", "subadmin", "guest"]).isRequired,
  onEntryClick: PropTypes.func.isRequired,
  onOptionClick: PropTypes.func.isRequired,
};

export default RankingSection;
