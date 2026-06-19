const OptionButton = ({ text, important,icon,onClick }) => {
  const hoverBg = important ? "hover:bg-red-500/10" : "hover:bg-primary/10";
  const hoverText = important
    ? "group-hover/item:text-red-500"
    : "group-hover/item:text-primary";

  return (
    <button
      className={`flex items-center gap-3 px-4 py-3 transition-colors group/item ${hoverBg}`}
      onClick={ onClick}
    >
      <span
        className={`material-symbols-outlined text-sm text-zinc-400 ${hoverText}`}
      >
        {icon}
      </span>

      <span
        className={`text-sm font-medium text-zinc-300 ${hoverText} font-lexend uppercase tracking-wider`}
      >
        {text}
      </span>
    </button>
  );
};

export default OptionButton;
