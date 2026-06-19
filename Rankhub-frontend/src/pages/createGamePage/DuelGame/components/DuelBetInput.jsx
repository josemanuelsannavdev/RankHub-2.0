import PropTypes from "prop-types";

function DuelBetInput({ value, onChange, inputId = "duel-bet" }) {
  return (
    <div className="mt-6">
      <label
        htmlFor={inputId}
        className="text-[10px] font-bold text-primary mb-2 block px-1 uppercase tracking-widest italic"
      >
        1. Apuesta del Duelo
      </label>
      <div className="relative">
        <input
          id={inputId}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-12 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white font-medium placeholder:text-slate-600"
          placeholder="Ej: 10 puntos"
          type="text"
          value={value}
          onChange={onChange}
        />
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">
          poker_chip
        </span>
      </div>
    </div>
  );
}

DuelBetInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  inputId: PropTypes.string,
};

DuelBetInput.defaultProps = {
  value: "",
  onChange: undefined,
  inputId: "duel-bet",
};

export default DuelBetInput;