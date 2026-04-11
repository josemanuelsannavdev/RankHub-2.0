import PropTypes from 'prop-types';

const FormHeader = ({titleFirstWord, titleSecondWord,subTitle}) => {
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
        {titleFirstWord} <span className="text-primary neon-glow">{titleSecondWord}</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-on-surface-variant text-sm font-light tracking-wide uppercase">
        {subTitle}
      </p>

    </div>
  );
};

FormHeader.propTypes = {
  titleFirstWord: PropTypes.string.isRequired,
  titleSecondWord: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default FormHeader;