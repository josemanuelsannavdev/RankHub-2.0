import React from "react";
import Header from "../../components/Header";
import BottomNavOneButton from "../../components/BottomNavOneButton";
function EventPage() {
  const buttonTitle = "Crear Apuesta";
  const handleCreateClick = () => {
    console.log("Crear apuesta");
  };
  const [gameName, setGameName] = React.useState("");

  return (
    <div className="bg-surface min-h-screen pb-24">
      <Header title="Evento futbol 22/06/2026 13:25" />

      <main className="px-4 pb-32">
        {/*<!-- Verses Layout (Bento Grid Style) -->*/}
        <div className="grid grid-cols-2 gap-4 relative">
          {/*<!-- Center VS Ornament -->*/}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-12 h-12 bg-surface flex items-center justify-center rounded-full border-2 border-outline-variant shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <span className="text-xs font-black italic text-on-surface tracking-tighter">
                VS
              </span>
            </div>
          </div>

          {/*<!-- Blue Side Column -->*/}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <div className="w-2 h-4 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] rounded-full"></div>
              <h2 className="text-xs font-black uppercase tracking-widest text-blue-400 neon-glow-blue">
                BLUE SIDE
              </h2>
            </div>
            <div className="space-y-3">
              {/*<!-- Participant Cards -->*/}
              <div className="glass-panel p-3 rounded-xl border border-blue-500/20 flex items-center gap-3">
                <img
                  alt="User Avatar"
                  className="w-10 h-10 rounded-lg border border-blue-500/30 object-cover"
                  data-alt="A professional esports player profile photo with dramatic blue neon side lighting. The player has a focused expression, wearing a sleek technical jersey with geometric patterns. The background is a dark, atmospheric gaming arena with soft bokeh lights in shades of deep sapphire and charcoal."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuClx1nc3E9bIJnBYkJoXzz7uBiyRI4s7Lc0BpARJsLawVJoXk5DnXWApXwMAuLh7qeeO5AAnM2H5M4I03sYiPJAwdKPQtHbVYQFOkkfgzqJ4GxBImGJmp4bUFk9pXDobs5cNiZEfP8jArbP7F7Nu_9SBG5eyKwHrUX2_lRQX2PS_js9F18j90HJosQo25E34OVpoKLDH-Vpy1g00CcZuoS-MGcobLF1dEXBNp6DGinliFwgCJPsia4u1dQ5Kp68dYo07QXADLwkZyGR"
                />
                <span className="text-[10px] font-bold text-on-surface truncate">
                  X-SKYWALKER
                </span>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-blue-500/20 flex items-center gap-3">
                <img
                  alt="User Avatar"
                  className="w-10 h-10 rounded-lg border border-blue-500/30 object-cover"
                  data-alt="Close-up portrait of a competitive female gamer with a neon blue glowing headset. Her face is partially illuminated by the cold blue light from her screen, creating high contrast against the dark studio background. The overall style is cyber-brutalist and high-fidelity digital photography."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5kjOT8CYrQ4XB0nzCAgtiXcXx5yrwBcYq1CbQv2F3OIQZd1FkYqzenHWvs8_VMlfAwzk-I2i9NxNh-mQGgLWGS7WhIZQ9atDGcNw7BGBmkwgqgs4epGMJi7__7oHXH99KqWi9N4A81rDEvuc4ftyVUOOmIo_BDqqkSXM4T5Gr5yrSWRVRNFO6tBy-NEm_0-TKFRtuH6bCGSNUO7F886bXnE-4CYtCO5Gl0_AeSQdrqhuSTHXjnPGkiHhAtNPY_dMgM6kBhKRvGQFu"
                />
                <span className="text-[10px] font-bold text-on-surface truncate">
                  VORTEX_01
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-outline-variant">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400/70 mb-2 block text-center">
                Cuota
              </label>
              <div className="flex items-center justify-center gap-4">
                
                <span className="text-2xl font-black text-on-surface tabular-nums">
                  x 0
                </span>
                
              </div>
            </div>
          </section>

          {/*<!-- Red Side Column -->*/}
          <section className="space-y-4">
            <div className="flex items-center justify-end gap-2 px-1">
              <h2 className="text-xs font-black uppercase tracking-widest text-red-500 neon-glow-red">
                RED SIDE
              </h2>
              <div className="w-2 h-4 bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.8)] rounded-full"></div>
            </div>
            <div className="space-y-3">
              {/*<!-- Participant Cards -->*/}
              <div className="glass-panel p-3 rounded-xl border border-red-500/20 flex items-center flex-row-reverse gap-3 text-right">
                <img
                  alt="User Avatar"
                  className="w-10 h-10 rounded-lg border border-red-500/30 object-cover"
                  data-alt="Cinematic portrait of an esports champion with sharp red rim lighting against a pitch-black background. He wears a futuristic high-collar jacket. The lighting emphasizes the contours of his face and the textures of the fabric, creating a gritty, elite competitive atmosphere consistent with high-end tournament UI."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQWHA2OlfTCcnbJmeuHKMuM5p6ktXqwEkBJWL2BM2SPbgQTb5c7dACC05NoN8fsz9bQ-2KSCZw612S1U8XfXn9_qUiYCK9D2ctldDdvba5PesQSpmMnZ3LxMUSBkrdAzdvpn1yIlxIOzyTUTY_YXYTeKAc9XerqmpEDJ2OQ_LJ5ZVcCN25xNVPL5qaK3X9LhVwMzszNrITJ-Qfpoqme2QK3xvrRUi6zA_gzBxhvGKZeDsh8248aO7iO5rgrnpRj7rekgjkIwI3ShsU"
                />
                <span className="text-[10px] font-bold text-on-surface truncate">
                  PHANTOM_X
                </span>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-red-500/20 flex items-center flex-row-reverse gap-3 text-right">
                <img
                  alt="User Avatar"
                  className="w-10 h-10 rounded-lg border border-red-500/30 object-cover"
                  data-alt="Digital art of a futuristic character with red glowing ocular implants. The image uses deep shadows and vibrant red highlights, reflecting a high-octane competitive gaming aesthetic. Dark techwear aesthetic, ultra-sharp detail, in a cyberpunk-themed tournament setting."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH_PLgCOfmHg0GDOf4cfpARnPhOU9S6Y5v0bsxofGdglVvNKRHybYsBhEvMEHg-_sg7hy4zCNlajW8F6bXkJ11HBtf8agBHaG5J568xf15rqzYHmQjCoCZq5wL21LCkxsZaiq4EhOnLbotZdr6KnV-jbMhP5MwrafcY_XI4cpnbrSg8wzEwRKpPKE8mCLxO2qDcMezK5XEGkxA-WXfaZV_p92AMkceudAx8IN0sMvEJzWtmyPzV7dHqZTqcocBkWDddGg9nfSYlWSY"
                />
                <span className="text-[10px] font-bold text-on-surface truncate">
                  BLAZE_RIP
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-outline-variant">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-500/70 mb-2 block text-center">
                Cuota
              </label>
              <div className="flex items-center justify-center gap-4">
                
                <span className="text-2xl font-black text-on-surface tabular-nums">
                  x 0
                </span>
                
              </div>
            </div>
          </section>
        </div>
      </main>

      <BottomNavOneButton
        onClick={handleCreateClick}
        buttonTitle={buttonTitle}
        disabled={false}
      />
    </div>
  );
}

export default EventPage;
