import PropTypes from 'prop-types';

function ParticipantActions({ primaryAction, secondaryAction }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-2xl transition-all">
        <span className="material-symbols-outlined text-primary">{primaryAction.icon}</span>
        <span className="text-xs font-bold uppercase tracking-wider">{primaryAction.label}</span>
      </button>
      <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-2xl transition-all">
        <span className="material-symbols-outlined text-primary">{secondaryAction.icon}</span>
        <span className="text-xs font-bold uppercase tracking-wider">{secondaryAction.label}</span>
      </button>
    </div>
  );
}

ParticipantActions.propTypes = {
  primaryAction: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  secondaryAction: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default ParticipantActions;
