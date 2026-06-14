import PropTypes from "prop-types";

import useChatComposer from "../hooks/useChatComposer";

function ChatInputBottom({ onSendMessage, disabled = false, statusMessage = "" }) {
  const { message, handleChange, handleSubmit } = useChatComposer({
    onSend: onSendMessage,
    disabled,
  });

  return (
    <div className="shrink-0 border-t border-white/10 bg-white/5 p-4">
      
      {statusMessage ? (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {statusMessage}
        </p>
      ) : null}
      <form className="relative flex items-center gap-2" onSubmit={handleSubmit}>
          <input
            className="flex-1 rounded-xl border border-white/10 bg-background-dark px-4 py-3 text-sm outline-none focus:border-primary focus:ring-primary"
            placeholder="Escribe un mensaje..."
            type="text"
            value={message}
            onChange={handleChange}
            disabled={disabled}
          />
          <button
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-background-dark shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={disabled}
            type="submit"
          >
            <span className="material-symbols-outlined font-bold">send</span>
          </button>
      </form>
    </div>
  );
}

ChatInputBottom.propTypes = {
  onSendMessage: PropTypes.func,
  disabled: PropTypes.bool,
  statusMessage: PropTypes.string,
};

export default ChatInputBottom;