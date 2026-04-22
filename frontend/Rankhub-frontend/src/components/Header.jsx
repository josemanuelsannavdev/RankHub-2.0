

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Header({ title = "RankHub" }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-200 dark:border-white/5">
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <h1 className="text-xl font-bold tracking-tight">
          {title}
        </h1>
      </div>

      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background-dark">
        <span className="material-symbols-outlined">
          person
        </span>
      </button>

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;