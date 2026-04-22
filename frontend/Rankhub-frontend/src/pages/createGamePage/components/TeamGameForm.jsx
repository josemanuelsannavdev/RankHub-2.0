import GameSelector from "./GameSelector";
import ParticipantActions from "./ParticipantActions";
import PlayersInMatchSection from "./PlayersInMatchSection";

const teams = [
  {
    name: "Equipo Lince",
    subtitle: "4 integrantes",
    highlighted: true,
  },
  {
    name: "Equipo Draco",
    subtitle: "3 integrantes",
  },
  {
    name: "Equipo Nova",
    subtitle: "5 integrantes",
  },
];

function TeamGameForm() {
  return (
    <>
      <GameSelector
        options={[
          "Liga de Futsal",
          "Torneo de Basket 3x3",
          "Captura la Bandera",
        ]}
      />
     
      <main className="px-4 pb-32">
      
       
        <div className="mt-6">
          <button className="w-full flex items-center justify-center gap-3 bg-primary text-background-dark py-5 rounded-2xl font-extrabold uppercase tracking-widest shadow-lg shadow-primary/10 active:scale-[0.98] transition-all">
            <span className="material-symbols-outlined font-bold">group_add</span>
            Crear Equipo
          </button>
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
              Equipos en Partida
            </h2>
            <span className="text-xs font-medium text-slate-400">Total: 2</span>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl relative h-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Los Galácticos
                    <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase">
                      Pos: 1
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium italic">
                    1,250 Puntos Acumulados
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-red-400 hover:bg-red-400/20 transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </button>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/5">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-primary/30 bg-slate-700 bg-cover"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8F-KcFmuOWH1i5HZjAtzq2DrDBYniYRvqF98TZdLtbrWhUhrsvVEU2HSIF_VcTEGz-JHHZCku5JNrJO1VXuP33o6zNT5XZ75sL7Ifol3AVt3yLM3py1AM51pGvGjHLYWObRc-qX7NxzQrxi67gRndHS2pRl6iluNPZxPkuja-PoOrtlNVoRe7MfX380cZX-J87HFIyInF5MccQUEeoqHXjdt2eB1ao-ZLEh7OgmpUc6DbfZ1RvE0U_BBb4yz4lbI4NzErEitM3qoq')" }}
                  ></div>
                  <div>
                    <p className="text-sm font-bold text-white leading-none">
                      Alejandro G.
                    </p>
                    <p className="text-[10px] text-primary/70 uppercase tracking-tighter mt-1">
                      Capitán
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/5">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-white/10 bg-slate-700 bg-cover"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFf5OKeDf02EIwkYoF9LJnBiQGj3Kja2ZzK1ig8YxqSm2sThsCRoYyNcSWgoFwaNr9q02nlyBBKyAmv7peAh4d2wrHh5e0U8tiVd2ycn-m5RpuLYUQo_Nh3__7BRyqYRdV_g3j9wosS5GCGCmpKsr95_kTxSW_q3ld1aY0karmGR5dHWSX-ACIZJktWf45KmHizp8F1BLRss_-KlICWeAVvHPHoOoTDNo0uXz9mTh5K_Q6hqaXcqNH2I1qVM_jzz1pnAUbdIsYntUM')" }}
                  ></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200 leading-none">
                      Mateo R.
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1">
                      Titular
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-full border-2 border-white/10 bg-slate-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400 text-xl">
                      person
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200 leading-none">
                      Roberto P.
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1">
                      Invitado
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 pt-4 border-t border-white/5">
                <button className="flex-1 flex items-center justify-center gap-2 text-slate-400 hover:text-primary transition-colors py-2 bg-white/5 rounded-xl">
                  <span className="material-symbols-outlined text-xl">
                    expand_less
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Subir
                  </span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 text-slate-400 hover:text-primary transition-colors py-2 bg-white/5 rounded-xl">
                  <span className="material-symbols-outlined text-xl">
                    expand_more
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Bajar
                  </span>
                </button>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl relative h-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Dream Team
                    <span className="bg-white/10 text-slate-400 text-[10px] px-2 py-0.5 rounded-full uppercase">
                      Pos: 2
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium italic">
                    980 Puntos Acumulados
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-red-400 hover:bg-red-400/20 transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </button>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/5">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-white/10 bg-slate-700 bg-cover"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFf5OKeDf02EIwkYoF9LJnBiQGj3Kja2ZzK1ig8YxqSm2sThsCRoYyNcSWgoFwaNr9q02nlyBBKyAmv7peAh4d2wrHh5e0U8tiVd2ycn-m5RpuLYUQo_Nh3__7BRyqYRdV_g3j9wosS5GCGCmpKsr95_kTxSW_q3ld1aY0karmGR5dHWSX-ACIZJktWf45KmHizp8F1BLRss_-KlICWeAVvHPHoOoTDNo0uXz9mTh5K_Q6hqaXcqNH2I1qVM_jzz1pnAUbdIsYntUM')" }}
                  ></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200 leading-none">
                      Carlos V.
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1">
                      Capitán
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-full border-2 border-white/10 bg-slate-800 flex items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined text-xl">
                      person
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200 leading-none">
                      Invitado #1
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1">
                      Temporal
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 pt-4 border-t border-white/5">
                <button className="flex-1 flex items-center justify-center gap-2 text-slate-400 hover:text-primary transition-colors py-2 bg-white/5 rounded-xl">
                  <span className="material-symbols-outlined text-xl">
                    expand_less
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Subir
                  </span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 text-slate-400 hover:text-primary transition-colors py-2 bg-white/5 rounded-xl">
                  <span className="material-symbols-outlined text-xl">
                    expand_more
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Bajar
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
     
    </>
  );
}

export default TeamGameForm;
