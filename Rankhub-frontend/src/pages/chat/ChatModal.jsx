import React from "react";
import Modal from "../../components/Modal";
import useChatRoom from "./hooks/useChatRoom";
import ChatHeader from "./components/ChatHeader";
import ChatInputBottom from "./components/ChatInputBottom";
import Chat from "./components/Chat";
import PropTypes from "prop-types";

function ChatModal( {onClose} ) {
  const {
    messages,
    userName,
    sendMessage,
    connectionStatus,
    connectionError,
  } = useChatRoom();

  let statusMessage = connectionError ?? "";

  if (!statusMessage) {
    if (connectionStatus === "connecting") {
      statusMessage = "Conectando al chat...";
    } else if (connectionStatus === "disconnected") {
      statusMessage = "Chat desconectado. Reintentando...";
    }
  }

  return (
    <Modal title="Chat" description="Chat with other players in real-time" >
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
        <ChatHeader onClose={onClose} />
        <Chat messages={messages} currentUserName={userName} />
        <ChatInputBottom
          disabled={connectionStatus !== "connected"}
          onSendMessage={sendMessage}
          statusMessage={statusMessage}
        />
      </div>
    </Modal>
  );
}

ChatModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ChatModal;