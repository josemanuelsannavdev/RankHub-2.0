import PropTypes from 'prop-types';

const modes = [
  { id: 'individual', label: 'Juego Individual' },
  { id: 'teams', label: 'Por Equipos' },
  { id: 'duel', label: 'Duelo' },
];

function GameModeTabs({ activeMode, onModeChange }) {
  const activeIndex = modes.findIndex((mode) => mode.id === activeMode);

  return (
    <div className="mt-4 p-1 rounded-2xl border border-white/10 bg-white/5">
      <div className="relative flex">
        <div
          className="absolute top-0 bottom-0 rounded-xl bg-primary shadow-sm transition-transform duration-300 ease-out"
          style={{ width: '33.3333%', transform: `translateX(${activeIndex * 100}%)` }}
        />

        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => onModeChange(mode.id)}
            className={`relative z-10 flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-colors ${
              activeMode === mode.id ? 'text-background-dark' : 'text-slate-400'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
}

GameModeTabs.propTypes = {
  activeMode: PropTypes.oneOf(['individual', 'teams', 'duel']).isRequired,
  onModeChange: PropTypes.func.isRequired,
};

export default GameModeTabs;
