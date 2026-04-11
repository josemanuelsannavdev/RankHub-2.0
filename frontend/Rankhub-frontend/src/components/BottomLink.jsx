import PropTypes from "prop-types";

const BottomLink = ({ firstPart, secondPart, href }) => {
  return (
    <div className="text-center mt-8">
      <p className="text-slate-400 text-sm">
        {firstPart}
        <a
          href={href}
          className="text-primary font-bold hover:text-yellow-200 transition-colors ml-1 uppercase text-xs tracking-tight"
        >
          {secondPart}
        </a>
      </p>
    </div>
  );
};

BottomLink.propTypes = {
  firstPart: PropTypes.string.isRequired,
  secondPart: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default BottomLink;
