import PropTypes from "prop-types";
const tabs = [
    {
      id: "games",
      label: "Games",
      icon: "sports_esports",
    },
    {
      id: "duels",
      label: "Duels",
      icon: "swords",
    },
  ];

const GameTabSelector = ({ activeTab, onChange }) => {
  
  return (
    <section className="pt-6">
      <div className="bg-white/50 dark:bg-white/5 p-1 rounded-2xl flex border border-slate-200 dark:border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-background-dark shadow-sm"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
};

GameTabSelector.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GameTabSelector;
