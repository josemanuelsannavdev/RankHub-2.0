import PropTypes from "prop-types";

const variantStyles = {
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

const MemberCard = ({ member, variant = "subadmin" , onClickOption } ) => {
  const styles =
    variantStyles[String(variant).toLowerCase()] ?? variantStyles.subadmin;
  
  const memberLabel =
    member?.email || member?.name || member?.username || "Member";
  
  
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low/40 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 ${styles.cardHoverBorder}`}
    >
      <div
        className={`absolute top-0 left-0 h-full w-1 bg-transparent transition-all duration-300 ${styles.accentBar}`}
      ></div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-lg border bg-surface-container-high ${styles.iconBorder}`}
          >
            <span className={`material-symbols-outlined ${styles.iconText}`}>
              person
            </span>
          </div>

          <div className="min-w-0">
            <h3
              className={`truncate text-lg font-bold transition-colors ${styles.titleHover}`}
            >
              {memberLabel}
            </h3>
            <p className="truncate text-[10px] font-medium uppercase tracking-widest text-on-surface-variant">
              {member?.role || variant}
            </p>
          </div>
        </div>

        <button
          type="button"
          className={`rounded-lg p-2 text-zinc-500 transition-colors ${styles.buttonHover}`}
          onClick={() => onClickOption(member)}
        >
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
      
    </div>
  );
};

MemberCard.propTypes = {
  member: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  variant: PropTypes.oneOf(["guest", "subadmin"]),
  onClickOption: PropTypes.func,
};

export default MemberCard;
