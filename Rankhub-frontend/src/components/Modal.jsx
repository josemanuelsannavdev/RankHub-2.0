import { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({children,title,description}) => {
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);
  
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen">
      <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity"></div>
      <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 pointer-events-none">
        <div className="w-full max-w-sm bg-[#1a1a0d] border border-white/10 rounded-[2.5rem] shadow-2xl pointer-events-auto flex flex-col max-h-[90vh] overflow-hidden">
          <div className="px-6 pt-8 pb-4">
            <h2 className="text-2xl font-extrabold text-white mb-1">
              {title}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {description}
            </p>
          </div>

          
            {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Modal;
