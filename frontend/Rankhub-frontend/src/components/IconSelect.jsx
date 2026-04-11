import PropTypes from "prop-types";

const icons = [
  "emoji_events", // trofeo
  "sports_soccer",
  "sports_esports",
  "movie",
  "music_note",
  "menu_book",
  "local_fire_department",
  "directions_car",
];

const IconSelect = ({ selected, onSelect }) => {
    return (
        <div className="space-y-2">
            <label className="text-xs text-slate-400 font-medium">
                Icono del ranking
            </label>
            <div
                className="
                grid grid-cols-4 gap-3
                bg-surface-container-low
                border border-outline/30
                rounded-xl
                p-3
                "
            >
                {icons.map((icon) => (
                    <button
                        type="button"
                        key={icon}
                        onClick={() => onSelect(icon)}
                        className={`
                        relative group
                        flex items-center justify-center
                        h-12 w-full
                        rounded-lg
                        transition-all
                        ${
                            selected === icon
                            ? "bg-primary/20 scale-105"
                            : "hover:bg-white/10"
                        }
                        `}
                    >
                        <span
                        className={`material-symbols-outlined text-xl transition-colors
                            ${selected === icon ? "text-primary" : "text-slate-500 group-hover:text-white"}
                        `}
                        >
                        {icon}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

IconSelect.propTypes = {
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default IconSelect;
