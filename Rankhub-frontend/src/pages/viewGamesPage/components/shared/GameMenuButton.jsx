import PropTypes from "prop-types";

const GameMenuButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
    >
      <span className="material-symbols-outlined">more_vert</span>
    </button>
  );
};

GameMenuButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GameMenuButton;
