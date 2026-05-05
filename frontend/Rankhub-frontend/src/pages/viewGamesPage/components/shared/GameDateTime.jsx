const GameDateTime = ({ date, time }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
        <span className="material-symbols-outlined text-xs">calendar_today</span>
        {date}
      </span>
      <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
        <span className="material-symbols-outlined text-xs">schedule</span>
        {time}
      </span>
    </div>
  );
};

export default GameDateTime;
