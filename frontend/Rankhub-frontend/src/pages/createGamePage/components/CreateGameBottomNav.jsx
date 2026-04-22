const navItems = [
  { icon: 'person_add', label: 'Añadir Participante' },
  { icon: 'history', label: 'Visualizar Histórico' },
  { icon: 'sports_esports', label: 'Mostrar Juegos' },
  { icon: 'swords', label: 'Mostrar Duelos' },
];

function CreateGameBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 px-2 py-3 pb-8 flex items-center justify-around z-50">
      <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer w-1/5">
        <span className="material-symbols-outlined text-[24px]">{navItems[0].icon}</span>
        <span className="text-[8px] font-bold text-center uppercase leading-tight px-1">
          {navItems[0].label}
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer w-1/5">
        <span className="material-symbols-outlined text-[24px]">{navItems[1].icon}</span>
        <span className="text-[8px] font-bold text-center uppercase leading-tight px-1">
          {navItems[1].label}
        </span>
      </div>

      <div className="relative -top-6 w-1/5 flex flex-col items-center">
        <div className="w-16 h-16 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-xl border-4 border-background-light dark:border-background-dark hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-3xl font-bold">add</span>
        </div>
        <span className="text-[8px] font-bold text-primary text-center uppercase mt-1">
          Crear Juego
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer w-1/5">
        <span className="material-symbols-outlined text-[24px]">{navItems[2].icon}</span>
        <span className="text-[8px] font-bold text-center uppercase leading-tight px-1">
          {navItems[2].label}
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors cursor-pointer w-1/5">
        <span className="material-symbols-outlined text-[24px]">{navItems[3].icon}</span>
        <span className="text-[8px] font-bold text-center uppercase leading-tight px-1">
          {navItems[3].label}
        </span>
      </div>
    </nav>
  );
}

export default CreateGameBottomNav;
