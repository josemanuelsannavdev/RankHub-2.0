import PropTypes from 'prop-types';

const LoginRegisterCard = ({ children, optionalTitle, onGoogleLogin }) => {
  return (
    <div className="bg-slate-950/60 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl neon-border">
      
      {/* Formulario */}
      {children}
      

      {/* Social Login */}
      <div className="mt-8 pt-8 border-t border-white/5">
        <p className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
          {optionalTitle}
        </p>

        <div className="grid grid-cols-1 gap-4">
          
          {/* Google */}
          <button
            type="button"
            className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl transition-colors"
            onClick={onGoogleLogin}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA3Mc9BVV44TNFqpMXIfB-apiZ-6hrguRd-_DkBx31z5Q_NF9yV1c4xtjjxZEnG1sVZ9tUR0jrffRk3iD-ZFhPFUzEi-1cEdBIj722Rz0ter_3JUKgeAHlx-VZ_uQ0fG3htxmzov2ofTyC8ylBV0yil-mrByIfgb0ou2efshDzONA-3Iq1S5ru633iipEERzHbJkJKs9fZCtY8cNgKzyOXGogMiBI8rBMvxGRXmf0RuTQ-RFi4c71q52n3sWREx8mEqCPC5IACcavo"
              alt="google icon"
              className="w-4 h-4 grayscale contrast-200"
            />
            <span className="text-[10px] font-bold uppercase">Google</span>
          </button>

          

        </div>
      </div>
    </div>
  );
};

LoginRegisterCard.propTypes = {
  children: PropTypes.node.isRequired,
  optionalTitle: PropTypes.string,
  onGoogleLogin: PropTypes.func,
};

export default LoginRegisterCard;