import PropTypes from "prop-types";

const variantStyles = {
  owner: {
    cardHoverBorder: "hover:border-primary/40",
    accentBar: "group-hover:bg-primary",
    iconText: "text-primary",
    iconBorder: "border-primary/20",
    titleHover: "group-hover:text-primary",
    buttonHover: "hover:text-primary active:bg-primary/10",
  },
  guest: {
    cardHoverBorder: "hover:border-[#cd7f32]/40",
    accentBar: "group-hover:bg-[#cd7f32]",
    iconText: "text-[#cd7f32]",
    iconBorder: "border-[#cd7f32]/20",
    titleHover: "group-hover:text-[#cd7f32]",
    buttonHover: "hover:text-[#cd7f32] active:bg-[#cd7f32]/10",
  },
  subadmin: {
    cardHoverBorder: "hover:border-slate-300/40",
    accentBar: "group-hover:bg-slate-300",
    iconText: "text-slate-300",
    iconBorder: "border-slate-300/20",
    titleHover: "group-hover:text-slate-300",
    buttonHover: "hover:text-slate-300 active:bg-slate-300/10",
  },
};

const RankingCard = ({
  ranking,
  variant = "owner",
  onClickEntry,
  onClickOption,
}) => {
  const styles = variantStyles[variant] ?? variantStyles.owner;

  return (
    <div
      className={` group relative bg-surface-container-low/40 backdrop-blur-md border border-outline-variant p-5 rounded-xl transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-hidden ${
        styles.cardHoverBorder
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-1 h-full bg-transparent transition-all duration-300 ${styles.accentBar}`}
      ></div>

      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
        {/* IZQUIERDA */}
        <div className="flex items-center gap-4 min-w-0">
          {/* ICONO */}
          <div
            className={`w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center border ${styles.iconBorder}`}
          >
            <span className={`material-symbols-outlined ${styles.iconText}`}>
              {ranking.icon}
            </span>
          </div>

          {/* TEXTO */}
          <div className="min-w-0">
            <h3
              className={`text-lg font-bold transition-colors truncate ${styles.titleHover}`}
            >
              {ranking.name}
            </h3>

            <p className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest truncate">
              {ranking?.description ?? "No description available"}
            </p>
          </div>
        </div>
        {/* BOTÓN Enter */}
        <button
          className={`transition-colors p-2 rounded-lg text-zinc-500 justify-self-end ${styles.buttonHover}`}
          onClick={onClickEntry}
        >
          <span className="material-symbols-outlined">play_circle</span>
        </button>
        
        {/* BOTÓN opciones */}
        <button
          className={`transition-colors p-2 rounded-lg text-zinc-500 justify-self-end ${styles.buttonHover}`}
          onClick={() => onClickOption(ranking)}
        >
          <span className="material-symbols-outlined">more_vert</span>
        </button>

      
      </div>
    </div>
  );
};

RankingCard.propTypes = {
  ranking: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  variant: PropTypes.oneOf(["owner", "subadmin", "guest"]),
  onClickEntry: PropTypes.func.isRequired,
  onClickOption: PropTypes.func.isRequired
};

export default RankingCard;
