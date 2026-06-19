import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";
import EventMessage from "./EventMessage";

function Chat({ messages = [], currentUserName }) {
  const chatScrollRef = useRef(null);

  const getMessageKey = (message) => {
    return message?.id ?? `${message?.username ?? "message"}-${message?.body ?? ""}`;
  };

  useEffect(() => {
    const chatContainer = chatScrollRef.current;

    if (!chatContainer) {
      return;
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  const hasMessages = messages.length > 0;
  return (
    <div ref={chatScrollRef} className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
      {hasMessages ? (
        messages.map((msg) => {
          if (msg.username === "EVENTO") {
            return <EventMessage key={getMessageKey(msg)} message={msg.body} />;
          }
          if (msg.username === currentUserName) {
            return <SentMessage key={getMessageKey(msg)} message={msg.body} />;
          }

          return (
            <ReceivedMessage
              key={getMessageKey(msg)}
              sender={msg.username}
              message={msg.body}
            />
          );
        })
      ) : (
        <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-white/5 bg-slate-900/30 p-6 text-center">
          <p className="text-sm text-slate-400">
            Todavía no hay mensajes. Escribe el primero desde abajo.
          </p>
        </div>
      )}
    </div>
  );
}

Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  currentUserName: PropTypes.string,
};

export default Chat;