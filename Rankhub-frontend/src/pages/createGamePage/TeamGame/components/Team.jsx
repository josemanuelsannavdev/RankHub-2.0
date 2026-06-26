import PropTypes from "prop-types";
import TeamMemberCard from "./TeamMemberCard";
const getPositionBadgeClassName = (position) => {
  if (position === 1) {
    return "bg-[#f9f506]/20 text-[#f9f506] border border-[#f9f506]/35";
  }

  if (position === 2) {
    return "bg-slate-300/20 text-slate-300 border border-slate-300/35";
  }

  if (position === 3) {
    return "bg-[#cd7f32]/20 text-[#cd7f32] border border-[#cd7f32]/35";
  }

  return "bg-slate-500/20 text-slate-400 border border-slate-400/25";
};

function Team({
  team,
  onEdit,
  onMoveUp,
  onMoveDown,
  onDelete,
  disableMoveUp,
  disableMoveDown,
}) {
  const badgeClassName = getPositionBadgeClassName(team.position);

  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-3xl relative h-auto">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {team.name}
            <span
              className={`${badgeClassName} text-[10px] px-2 py-0.5 rounded-full uppercase`}
            >
              Pos: {team.position}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 font-medium italic">
            {team.points} points
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-primary transition-colors"
            onClick={onEdit}
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-red-400 hover:bg-red-400/20 transition-colors"
            onClick={onDelete}
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        {team.members.map((member) => (
          <TeamMemberCard
            key={`${team.name}-${member.name}`}
            avatarUrl={member.avatarUrl}
            name={member.name}
            role={member.role}
          />
        ))}
      </div>
      <div className="flex justify-center gap-4 pt-4 border-t border-white/5">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 text-slate-400 hover:text-primary transition-colors py-2 bg-white/5 rounded-xl disabled:cursor-not-allowed disabled:opacity-40"
          onClick={onMoveUp}
          disabled={disableMoveUp}
        >
          <span className="material-symbols-outlined text-xl">expand_less</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Subir
          </span>
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 text-slate-400 hover:text-primary transition-colors py-2 bg-white/5 rounded-xl disabled:cursor-not-allowed disabled:opacity-40"
          onClick={onMoveDown}
          disabled={disableMoveDown}
        >
          <span className="material-symbols-outlined text-xl">expand_more</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Bajar
          </span>
        </button>
      </div>
    </div>
  );
}

Team.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    points: PropTypes.string.isRequired,
    highlighted: PropTypes.bool,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  disableMoveUp: PropTypes.bool,
  disableMoveDown: PropTypes.bool,
};

Team.defaultProps = {
  onEdit: undefined,
  onMoveUp: undefined,
  onMoveDown: undefined,
  onDelete: undefined,
  disableMoveUp: false,
  disableMoveDown: false,
};

export default Team;
