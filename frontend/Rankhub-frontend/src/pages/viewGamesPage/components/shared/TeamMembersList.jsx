const TeamMembersList = ({ members, isSecondTeam = false }) => {
  console.log("TeamMembersList render", { members, isSecondTeam });
  return (
    <div className="flex flex-wrap gap-2 py-1">
      {members.map((member, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-full border border-slate-200 dark:border-white/10 ${
            isSecondTeam ? "opacity-80" : ""
          }`}
        >
          {member.player && member.player.image ? (
            <div
              className="w-5 h-5 rounded-full bg-cover"
              style={{
                backgroundImage: member.player.image
                  ? `url('${member.player.image}')`
                  : "none",
                backgroundColor: member.player.image
                  ? "transparent"
                  : "#cbd5e1",
              }}
            ></div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-500 ">
              <span className="material-symbols-outlined text-sm text-slate-400 ">
                person
              </span>
            </div>
          )}

          <span className="text-[10px] font-medium">{member.player?.name || member.guestName}</span>
        </div>
      ))}
    </div>
  );
};

export default TeamMembersList;
