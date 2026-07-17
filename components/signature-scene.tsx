"use client";

export function SignatureScene() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-glow">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-[10%] top-[14%] h-32 w-32 rounded-full bg-pink-400/20 blur-3xl animate-float" />
        <div className="absolute right-[8%] top-[18%] h-36 w-36 rounded-full bg-cyan-300/18 blur-3xl animate-float" style={{ animationDelay: "-2s" }} />
        <div className="absolute bottom-[12%] left-[18%] h-28 w-28 rounded-full bg-emerald-300/16 blur-3xl animate-float" style={{ animationDelay: "-4s" }} />
      </div>

      <div className="absolute inset-0 hero-grid opacity-20" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-44 w-44 items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.06] backdrop-blur-2xl">
          <div className="absolute inset-4 rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-pink-500/20 via-white/5 to-cyan-400/15" />
          <div className="relative z-10 text-center">
            <div className="text-xs uppercase tracking-[0.28em] text-white/45">reawen ai</div>
            <div className="mt-2 text-3xl">✦</div>
            <div className="mt-2 text-sm font-medium text-white/90">soft play mode</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-slate-950/55 px-4 py-3 text-xs text-white/65 backdrop-blur-xl">
        <span>cute layer</span>
        <span>premium motion</span>
        <span>share-ready cards</span>
      </div>
    </div>
  );
}