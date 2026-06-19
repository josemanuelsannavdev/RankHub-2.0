import PropTypes from "prop-types";

const FormInputIcon = ({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1">
        {label}
      </label>

      {/* Input wrapper */}
      <div className="relative group">
        {/* Icono */}
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
          {icon}
        </span>

        {/* Input */}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full
            bg-surface-container-low
            border border-outline/30
            rounded-xl
            py-4 pl-12 pr-4
            text-on-surface
            placeholder:text-slate-600
            focus:outline-none
            focus:border-primary/50
            focus:ring-1 focus:ring-primary/20
            transition-all
            font-medium
            text-sm
          "
        />
      </div>
    </div>
  );
};

FormInputIcon.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormInputIcon;
