import PropTypes from "prop-types";

const CancelButton = ({ text , onClick}) => {
  return (
    <button
      type="button"
      className="
        w-full text-slate-400 py-3 rounded-2xl font-bold text-sm hover:text-white transition-colors
        hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-slate-300
        "
      onClick={onClick}
    >
      {text}
    </button>
  );
};

CancelButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default CancelButton;
