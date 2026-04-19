import PropTypes from "prop-types";
import RankingCard from "./RankingCard";

function RankingSection({ title, badgeText, badgeClassName, rankings, variant, onEntryClick, onOptionClick }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${badgeClassName}`}
        >
          {badgeText}
        </span>
        <h2 className="text-xl font-extrabold uppercase tracking-widest text-on-surface-variant">
          {title}
        </h2>
      </div>

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
