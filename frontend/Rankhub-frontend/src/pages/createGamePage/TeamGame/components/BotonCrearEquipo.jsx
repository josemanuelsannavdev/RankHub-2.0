import PropTypes from 'prop-types';

function BotonCrearEquipo({ onClick }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 bg-primary text-background-dark py-5 rounded-2xl font-extrabold uppercase tracking-widest shadow-lg shadow-primary/10 active:scale-[0.98] transition-all"
      onClick={onClick}
    >
      <span className="material-symbols-outlined font-bold">group_add</span>
      {' '}
      Crear Equipo
    </button>
  );
}

BotonCrearEquipo.propTypes = {
  onClick: PropTypes.func,
};

BotonCrearEquipo.defaultProps = {
  onClick: undefined,
};

export default BotonCrearEquipo;