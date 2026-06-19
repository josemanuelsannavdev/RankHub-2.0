import GameMenuButton from "../shared/GameMenuButton";
import PropTypes from "prop-types";

const GameCard = ({
  children,
  onMenuClick,
  isHighlighted = false,
  isOpacity = false,
}) => {
  return (
    <div
      className={`bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm relative ${
        isHighlighted ? "border-l-4 border-l-primary" : ""
      } ${isOpacity ? "opacity-90" : ""}`}
    >
      <GameMenuButton onClick={onMenuClick} />
      {children}
    </div>
  );
};

GameCard.propTypes = {
  children: PropTypes.node.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  isHighlighted: PropTypes.bool,
  isOpacity: PropTypes.bool,
};  

export default GameCard;
