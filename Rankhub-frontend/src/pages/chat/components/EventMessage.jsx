
import PropTypes from "prop-types";

function EventMessage({ message }) {
  return (
     <div className="flex justify-center">
        <span className="text-[10px] uppercase tracking-widest text-slate-500 bg-white/5 px-3 py-1 rounded-full">
          {message}
        </span>
      </div>

  );
};


EventMessage.propTypes = {
  message: PropTypes.string,
};


export default EventMessage;