import React from "react";
import PropTypes from "prop-types";

const DuelFilters = ({ searchValue, onSearchChange, onClearFilters }) => {
  return (
    <section className="py-6 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Filtrar duelos
        </h2>
        <button
          onClick={onClearFilters}
          className="text-xs font-bold text-primary flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">
            filter_list_off
          </span>
          {"LIMPIAR"}
        </button>
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
          placeholder="Buscar duelos por nombre..."
        />
      </div>
    </section>
  );
};

DuelFilters.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default DuelFilters;
