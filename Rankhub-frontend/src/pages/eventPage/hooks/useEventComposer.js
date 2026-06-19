import { useCallback, useEffect, useState } from "react";

const useEventComposer = ({ onSend, disabled = false } = {}) => {
  const [bet, setBet] = useState(null);

  const handleSendBet = useCallback(
    (event) => {
      event.preventDefault();
      if (!bet || disabled) {
        return;
      }
      const wasSent = onSend?.(bet);
      if (wasSent !== false) {
        setBet(null);
      }
    },
    [onSend, bet, disabled],
  );

  return {
    bet,
    setBet,
    handleSendBet,
  };
};

export default useEventComposer;
