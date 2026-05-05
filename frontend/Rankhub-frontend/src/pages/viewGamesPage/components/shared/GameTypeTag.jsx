import PropTypes from "prop-types";

const gameTypeConfig = {
  individual: {
    label: "Individual",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-500",
  },
  team: {
    label: "Por Equipos",
    bgClass: "bg-primary/20",
    textClass: "text-primary",
  },
  duel: {
    label: "Duelo",
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-600",
  },
};

function GameTypeTag({ type = "individual" }) {
  const config = gameTypeConfig[type] || gameTypeConfig.individual;

  return (
    <span
      className={`${config.bgClass} ${config.textClass} text-[10px] font-bold px-2 py-0.5 rounded uppercase`}
    >
      {config.label}
    </span>
  );
}

GameTypeTag.propTypes = {
  type: PropTypes.oneOf(["individual", "team", "duel"]),
};

export default GameTypeTag;
