import PropTypes from "prop-types";

function SentMessage({ message }) {
  return (
    <div className="flex items-end justify-end gap-2 ml-auto max-w-[85%]">
        <div className="bg-primary p-3 rounded-2xl rounded-br-none shadow-[0_0_15px_rgba(249,245,6,0.3)]">
          <p className="text-sm text-background-dark font-medium">
            {message}
          </p>
        </div>
      </div>
  );
}

SentMessage.propTypes = {
  message: PropTypes.string,
};

export default SentMessage;