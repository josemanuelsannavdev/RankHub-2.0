import PropTypes from "prop-types";

function ChatHeader({ onClose }) {

  

  return (
    <div className="shrink-0 border-b border-white/10 bg-white/5 p-4 flex items-center justify-between">
      <h2 className="text-xl font-bold uppercase tracking-tight text-primary">
        Chat
      </h2>
      <button
        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500/20 transition-colors"
        onClick={ onClose}
        type="button"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
}

ChatHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ChatHeader;