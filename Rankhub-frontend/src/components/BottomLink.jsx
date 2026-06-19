import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const BottomLink = ({ firstPart, secondPart, href }) => {
  return (
    <div className="text-center mt-8">
      <p className="text-slate-400 text-sm">
        {firstPart}
        <Link
          to={href}
          className="text-primary font-bold hover:text-yellow-200 transition-colors ml-1 uppercase text-xs tracking-tight"
        >
          {secondPart}
        </Link>
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
