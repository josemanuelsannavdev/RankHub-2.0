import PropTypes from "prop-types";

 const filterOptions = [
    { id: "all", label: "All" },
    { id: "INDIVIDUAL_GAME", label: "Individual" },
    { id: "TEAM_GAME", label: "Team" },
  ];
const GameFilters = ({
  activeFilter,
  onFilterChange,
  searchValue,
  onSearchChange,
  onClearFilters,
}) => {
 

  return (
    <section className="py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Filter Games
        </h2>
        <button
          onClick={onClearFilters}
          className="text-xs font-bold text-primary flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">
            filter_list_off
          </span>
          {"Clear Filters"}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onFilterChange(option.id)}
            className={`flex-none px-4 py-2 rounded-full text-xs font-bold transition-colors ${
              activeFilter === option.id
                ? "bg-primary text-background-dark shadow-sm"
                : "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
          search
        </span>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:ring-primary focus:border-primary"
          placeholder="Search games by name..."
        />
      </div>
    </section>
  );
};

GameFilters.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default GameFilters;
