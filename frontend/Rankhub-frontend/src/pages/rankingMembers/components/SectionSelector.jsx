import PropTypes from "prop-types";
 const tabs = [
    {
      id: "members",
      label: "Miembros",
      icon: "people",
    },
    {
      id: "invitations",
      label: "Invitaciones",
      icon: "mail",
    },
  ];

const SectionSelector = ({ activeTab, onChange }) => {
 
  return (
    <section className="mb-8" aria-label="Member sections">
      <div className="inline-flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-low/50 p-1 backdrop-blur-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            data-active={activeTab === tab.id}
            onClick={() => onChange(tab.id)}
            className={`rounded-lg border border-transparent px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors ${
              activeTab === tab.id
                ? "bg-primary/20 text-primary border-primary/40"
                : ""
            }`}
          >
            <span className="material-symbols-outlined mr-2 align-middle text-lg">
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SectionSelector;

SectionSelector.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
