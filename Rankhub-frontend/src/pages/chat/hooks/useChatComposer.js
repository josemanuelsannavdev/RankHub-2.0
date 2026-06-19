import { useCallback, useState } from "react";

const useChatComposer = ({ onSend, disabled = false } = {}) => {
  const [message, setMessage] = useState("");

  const handleChange = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const normalizedMessage = message.trim();

      if (!normalizedMessage || disabled) {
        return;
      }

      
      const wasSent = onSend?.(normalizedMessage);

      if (wasSent !== false) {
        setMessage("");
      }
    },
    [disabled, message, onSend],
  );

  return {
    message,
    setMessage,
    handleChange,
    handleSubmit,
  };
};

export default useChatComposer;
