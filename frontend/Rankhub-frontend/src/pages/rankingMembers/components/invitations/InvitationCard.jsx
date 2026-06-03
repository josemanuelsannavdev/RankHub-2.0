import PropTypes from "prop-types";


const InvitationCard = ({ invitation, onClickCancel }) => {
  
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low/40 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:border-slate-300/40`}
    >
      <div
        className={`absolute top-0 left-0 h-full w-1 bg-transparent transition-all duration-300 group-hover:bg-slate-300`}
      ></div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-lg border bg-surface-container-high `}
          >
            <span className={`material-symbols-outlined text-slate-300`}>
              email
            </span>
          </div>

          <div className="min-w-0">
            <h3 className={`truncate text-lg font-bold transition-colors group-hover:text-slate-300`}>
              {invitation.email || invitation.name || "Invitation"}
            </h3>
            <p className="truncate text-[10px] font-medium uppercase tracking-widest text-on-surface-variant">
              {invitation.status || "Pending"}
            </p>
          </div>
        </div>

        
          <button
            type="button"
            className={`rounded-lg p-2 text-zinc-500 transition-colors hover:text-red-500 active:bg-slate-300/10`}
            onClick={() => onClickCancel(invitation)}
          >
            <span className="material-symbols-outlined">cancel</span>
          </button>
    
      </div>
    </div>
  );
};

InvitationCard.propTypes = {
  invitation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClickCancel: PropTypes.func,
};

export default InvitationCard;
