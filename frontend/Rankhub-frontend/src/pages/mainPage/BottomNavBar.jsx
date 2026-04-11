import PropTypes from "prop-types";

function BottomNavBar({onClick}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-white/10">
      <div className="flex justify-around items-center py-3">
        

        {/* BOTÓN CENTRAL -> crear juego  */}
        <button className="relative -top-6 w-1/5 flex flex-col items-center" onClick ={onClick}>
          <div className="w-16 h-16 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-xl border-4 border-background-light dark:border-background-dark hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-3xl font-bold">
              add
            </span>
          </div>

          <span className="text-[8px] font-bold text-primary text-center uppercase mt-1">
            Create Ranking
          </span>
        </button>


        
      </div>
    </div>
  );
}

BottomNavBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};



export default BottomNavBar;
