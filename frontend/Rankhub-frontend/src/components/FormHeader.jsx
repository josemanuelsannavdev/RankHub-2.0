import PropTypes from 'prop-types';

const FormHeader = ({ title, titleFirstWord, titleSecondWord, subTitle }) => {
  const computedFirst = title
    ? title.split(" ").slice(0, -1).join(" ") || title
    : titleFirstWord;
  const computedSecond = title
    ? title.split(" ").slice(-1).join(" ")
    : titleSecondWord;

  return (
    <div className="text-center mb-10">
      
      {/* Icono */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-950 border border-primary/30 mb-6 shadow-[0_0_20px_rgba(249,245,6,0.2)]">
        <span
          className="material-symbols-outlined text-primary text-4xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          sports_esports
        </span>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-black tracking-tighter text-on-surface uppercase mb-2">
        {computedFirst} <span className="text-primary neon-glow">{computedSecond}</span>
      </h1>

      {/* Subtítulo */}
      {subTitle && (
        <p className="text-on-surface-variant text-sm font-light tracking-wide uppercase">
          {subTitle}
        </p>
      )}

    </div>
  );
};

FormHeader.propTypes = {
  title: PropTypes.string,
  titleFirstWord: PropTypes.string,
  titleSecondWord: PropTypes.string,
  subTitle: PropTypes.string,
};

export default FormHeader;