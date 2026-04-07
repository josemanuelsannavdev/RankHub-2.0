import '../../styles/rankingMain/podium.css'

function Podium() {
  return (
    <section className="px-4 pt-8 pb-12 flex items-end justify-center gap-2">
      
      {/* 2º puesto */}
      <div className="flex flex-col items-center flex-1 max-w-[120px]">
        
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-full border-4 border-slate-400 overflow-hidden bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFf5OKeDf02EIwkYoF9LJnBiQGj3Kja2ZzK1ig8YxqSm2sThsCRoYyNcSWgoFwaNr9q02nlyBBKyAmv7peAh4d2wrHh5e0U8tiVd2ycn-m5RpuLYUQo_Nh3__7BRyqYRdV_g3j9wosS5GCGCmpKsr95_kTxSW_q3ld1aY0karmGR5dHWSX-ACIZJktWf45KmHizp8F1BLRss_-KlICWeAVvHPHoOoTDNo0uXz9mTh5K_Q6hqaXcqNH2I1qVM_jzz1pnAUbdIsYntUM')"
            }}
          />
          <div className="absolute -top-2 -right-2 bg-slate-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            2
          </div>
        </div>

        <div className="podium-gradient-2 w-full h-24 rounded-t-lg flex flex-col items-center justify-start pt-3 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
            Silver
          </span>
          <span className="text-slate-900 font-bold text-sm mt-1">
            2,100 pts
          </span>
        </div>

        <p className="mt-2 text-xs font-semibold text-center truncate w-full">
          Mateo López
        </p>
      </div>

      {/* 1º puesto */}
      <div className="flex flex-col items-center flex-1 max-w-[140px] transform -translate-y-4">
        
        <div className="relative mb-3">
          
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-primary">
            <span className="material-symbols-outlined text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}>
              emoji_events
            </span>
          </div>

          <div className="w-20 h-20 rounded-full border-4 border-primary overflow-hidden bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8F-KcFmuOWH1i5HZjAtzq2DrDBYniYRvqF98TZdLtbrWhUhrsvVEU2HSIF_VcTEGz-JHHZCku5JNrJO1VXuP33o6zNT5XZ75sL7Ifol3AVt3yLM3py1AM51pGvGjHLYWObRc-qX7NxzQrxi67gRndHS2pRl6iluNPZxPkuja-PoOrtlNVoRe7MfX380cZX-J87HFIyInF5MccQUEeoqHXjdt2eB1ao-ZLEh7OgmpUc6DbfZ1RvE0U_BBb4yz4lbI4NzErEitM3qoq')"
            }}
          />

          <div className="absolute -top-2 -right-2 bg-primary text-background-dark w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
            1
          </div>
        </div>

        <div className="podium-gradient-1 w-full h-36 rounded-t-lg flex flex-col items-center justify-start pt-4 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-background-dark">
            Gold
          </span>
          <span className="text-background-dark font-bold text-lg mt-1">
            2,450 pts
          </span>
        </div>

        <p className="mt-2 text-sm font-bold text-center truncate w-full">
          Alejandro Sanz
        </p>
      </div>

      {/* 3º puesto */}
      <div className="flex flex-col items-center flex-1 max-w-[120px]">
        
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-full border-4 border-amber-700 overflow-hidden bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDa3_PSWIzvH7kxeP6KZwN-KXvtvcblgmxcNesmGACp2KpJ14uGL40GE7TaUuoA9XJdRPQVxxX3uBWaxjqxRhmXNIDpQG1zs5jZ6UafhI4dTZbDGt6MCITCBpa4cUDorBvWPNsMH9n4ZyYkAPKzRMg1X_yQRAqx7xM0ZYMmz1UncM4ZP_daUHrkq8wlvPEh2oZVii_r8xE7A479-ntAoTYXfzc5JSTMLf7IZN_sOpPpe2K3nWBSFzfZm9Ou4msOfAkPI4JjVM-rV4Q6')"
            }}
          />
          <div className="absolute -top-2 -right-2 bg-amber-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            3
          </div>
        </div>

        <div className="podium-gradient-3 w-full h-20 rounded-t-lg flex flex-col items-center justify-start pt-3 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
            Bronze
          </span>
          <span className="text-white font-bold text-sm mt-1">
            1,950 pts
          </span>
        </div>

        <p className="mt-2 text-xs font-semibold text-center truncate w-full">
          Lucía Duarte
        </p>
      </div>

    </section>
  );
}

export default Podium;