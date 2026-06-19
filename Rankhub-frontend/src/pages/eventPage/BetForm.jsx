import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import CancelButton from "../../components/CancelButton";
import PropTypes from "prop-types";
import { useState } from "react";
function BetForm(props) {
  const { onClose, onSubmit, playersBet = [] } = props;
  const [selectedSide, setSelectedSide] = useState("blue");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [betAmount, setBetAmount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedBetAmount = Number(betAmount);
    
    if (!selectedSide || !selectedPlayer?.id || !Number.isInteger(normalizedBetAmount)) {
      return;
    }

    if (normalizedBetAmount < 1 || normalizedBetAmount > 10) {
      return;
    }

    onSubmit?.({
      side: selectedSide,
      playerId: selectedPlayer?.id,
      betAmount: normalizedBetAmount,
      playerName: selectedPlayer?.name,
      playerImage: selectedPlayer?.image,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-6">
        <fieldset className="space-y-3">
          <legend className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Selecciona un lado
          </legend>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="betSide"
              value="blueSide"
              checked={selectedSide === "blueSide"}
              onChange={() => setSelectedSide("blueSide")}
              className="form-radio text-primary"
            />
            <span>BlueSide</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="betSide"
              value="redSide"
              checked={selectedSide === "redSide"}
              onChange={() => setSelectedSide("redSide")}
              className="form-radio text-primary"
            />
            <span>RedSide</span>
          </label>
        </fieldset>

        <div className="flex flex-col space-y-2">
          <label htmlFor="bet-player-select" className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Jugador
          </label>
          <select
            id="bet-player-select"
            value={selectedPlayer?.id}
            onChange={(event) => setSelectedPlayer(playersBet.find((p) => p.id === event.target.value))}
            className="form-select text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Selecciona un jugador</option>
            {playersBet.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>

        <FormInput
          label="Bet Amount"
          type="number"
          min="1"
          max="10"
          placeholder="1-10"
          value={betAmount}
          onChange={(event) => setBetAmount(event.target.value)}
        />
      </div>

      <div className="p-6 space-y-3 bg-gradient-to-t from-background-dark to-transparent">
        <SubmitButton text={"Create Bet"} fullWidth />
        <CancelButton text="Cancel" fullWidth onClick={onClose} />
      </div>
    </form>
  );
}

BetForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  playersBet: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};

;
export default BetForm;