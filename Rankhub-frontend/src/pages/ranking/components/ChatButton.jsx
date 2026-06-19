function ChatButton({OnClick}) {
  return (
    <div className="px-4 py-3 bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-white/5">
      
      <div className="flex items-end gap-2">
        
         

        {/* Botones */}
        <div className="flex gap-1.5 shrink-0">
          
          <button
            onClick={OnClick}
            type="button"
            className="h-[38px] w-10 flex items-center justify-center bg-primary text-background-dark rounded-xl active:scale-95 transition-transform"
            title="Open Chat"
          >
            <span className="material-symbols-outlined text-[20px]">
              chat
            </span>
          </button>
          
        </div>

      </div>
    </div>
  );
}

export default ChatButton;