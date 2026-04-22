function CreateGameHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-primary">Crear Juego</h1>
      </div>
      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background-dark shadow-lg shadow-primary/20">
        <span className="material-symbols-outlined">save</span>
      </button>
    </header>
  );
}

export default CreateGameHeader;
