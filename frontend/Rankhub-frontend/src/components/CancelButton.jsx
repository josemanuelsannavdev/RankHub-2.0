import PropTypes from "prop-types";

const CancelButton = ({ text , onClick}) => {
  return (
    <button
      type="button"
      className="
        w-full text-slate-400 py-3 rounded-2xl font-bold text-sm hover:text-white transition-colors
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
