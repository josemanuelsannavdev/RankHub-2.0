import PropTypes from "prop-types";


function ReceivedMessage({ message, sender }) {
  return (
    
 <div className="flex items-end gap-2 max-w-[85%]">
        
        <div className="bg-slate-900/80 p-3 rounded-2xl rounded-bl-none border border-white/5">
          <p className="text-[10px] font-bold text-primary mb-1">{sender}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
  );
};

ReceivedMessage.propTypes = {
  message: PropTypes.string,
  sender: PropTypes.string,
};

export default ReceivedMessage;