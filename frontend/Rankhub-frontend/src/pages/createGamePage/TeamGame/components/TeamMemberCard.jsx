import PropTypes from "prop-types";

function TeamMemberCard({ name, role, avatarUrl, onRemove }) {
  const isImageAvatar = Boolean(avatarUrl);

  return (
    <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/5">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full border-2 ${isImageAvatar ? "border-primary/30 bg-cover" : "border-white/10 bg-slate-800 flex items-center justify-center text-slate-500"}`}
          style={
            isImageAvatar
              ? { backgroundImage: `url('${avatarUrl}')` }
              : undefined
          }
        >
          {isImageAvatar ? null : (
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-500 ">
              <span className="material-symbols-outlined text-sm text-slate-400 ">
                person
              </span>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-none">{name}</p>
          <p className="text-[10px] text-primary/70 uppercase tracking-tighter mt-1">
            {role}
          </p>
        </div>
      </div>

      {onRemove ? (
        <button
          type="button"
          className="text-red-400 p-1"
          onClick={onRemove}
          aria-label={`Eliminar ${name}`}
        >
          <span className="material-symbols-outlined text-lg">
            remove_circle_outline
          </span>
        </button>
      ) : null}
    </div>
  );
}

TeamMemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  onRemove: PropTypes.func,
};

TeamMemberCard.defaultProps = {
  avatarUrl: undefined,
  onRemove: undefined,
};

export default TeamMemberCard;
