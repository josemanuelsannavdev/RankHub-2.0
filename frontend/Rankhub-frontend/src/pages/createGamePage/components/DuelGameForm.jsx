import GameSelector from "./GameSelector";
import ParticipantActions from "./ParticipantActions";
import PlayersInMatchSection from "./PlayersInMatchSection";

const duelPlayers = [
  {
    name: "Nadia Rivas",
    subtitle: "RANK: #5",
    highlighted: true,
  },
  {
    name: "Ivan Costa",
    subtitle: "RANK: #6",
  },
];

function DuelGameForm() {
  return (
    <>
      <GameSelector
        options={["Uno Contra Uno", "Street Fighter", "Ajedrez Blitz"]}
      />
      <main class="px-4 pb-32">
        
      
        <div className="mt-6">
          <label className="text-[10px] font-bold text-primary mb-2 block px-1 uppercase tracking-widest italic">
            1. Apuesta del Duelo
          </label>
          <div className="relative">
            <input
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-12 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white font-medium placeholder:text-slate-600"
              placeholder="Ej: 10 puntos"
              type="text"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">
              poker_chip
            </span>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-6 rounded-2xl transition-all group">
            <span className="material-symbols-outlined text-winner-green text-3xl group-hover:scale-110 transition-transform">
              emoji_events
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-winner-green">
              Añadir Ganador
            </span>
          </button>
           
          <button className="flex flex-col items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-6 rounded-2xl transition-all group">
            <span className="material-symbols-outlined text-loser-red text-3xl group-hover:scale-110 transition-transform">
              thumb_down
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-loser-red">
              Añadir Perdedor
            </span>
          </button>
        </div>
        <div className="mt-10 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-background-dark border-2 border-primary w-12 h-12 rounded-full flex items-center justify-center italic font-black text-primary shadow-[0_0_20px_rgba(249,245,6,0.3)]">
              VS
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-winner-green/5 border-2 border-winner-green/50 p-4 rounded-3xl flex items-center gap-4 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-full bg-center bg-cover border-2 border-winner-green"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8F-KcFmuOWH1i5HZjAtzq2DrDBYniYRvqF98TZdLtbrWhUhrsvVEU2HSIF_VcTEGz-JHHZCku5JNrJO1VXuP33o6zNT5XZ75sL7Ifol3AVt3yLM3py1AM51pGvGjHLYWObRc-qX7NxzQrxi67gRndHS2pRl6iluNPZxPkuja-PoOrtlNVoRe7MfX380cZX-J87HFIyInF5MccQUEeoqHXjdt2eB1ao-ZLEh7OgmpUc6DbfZ1RvE0U_BBb4yz4lbI4NzErEitM3qoq')",
                  }}
                ></div>
                <div className="absolute -top-2 -right-2 bg-winner-green text-white rounded-full p-1 border-2 border-background-dark">
                  <span className="material-symbols-outlined text-sm font-bold block">
                    trophy
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-winner-green uppercase tracking-widest mb-1 italic">
                  Ganador
                </p>
                <h3 className="text-lg font-extrabold leading-none text-white">
                  ALEJANDRO SANZ
                </h3>
                <p className="text-xs text-slate-400 mt-1">Nivel: Pro Gamer</p>
              </div>
              <button className="text-slate-500 hover:text-red-500 p-2">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="relative overflow-hidden bg-loser-red/5 border-2 border-loser-red/40 p-4 rounded-3xl flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full bg-center bg-cover border-2 border-loser-red/60 grayscale-[0.5]"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFf5OKeDf02EIwkYoF9LJnBiQGj3Kja2ZzK1ig8YxqSm2sThsCRoYyNcSWgoFwaNr9q02nlyBBKyAmv7peAh4d2wrHh5e0U8tiVd2ycn-m5RpuLYUQo_Nh3__7BRyqYRdV_g3j9wosS5GCGCmpKsr95_kTxSW_q3ld1aY0karmGR5dHWSX-ACIZJktWf45KmHizp8F1BLRss_-KlICWeAVvHPHoOoTDNo0uXz9mTh5K_Q6hqaXcqNH2I1qVM_jzz1pnAUbdIsYntUM')",
                }}
              ></div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-loser-red uppercase tracking-widest mb-1 italic">
                  Perdedor
                </p>
                <h3 className="text-lg font-extrabold leading-none text-loser-red">
                  MATEO LÓPEZ
                </h3>
                <p className="text-xs text-slate-500 mt-1">Nivel: Amateur</p>
              </div>
              <button className="text-slate-600 hover:text-red-500 p-2">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DuelGameForm;
