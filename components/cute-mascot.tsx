export function CuteMascot() {
  return (
    <div className="glass-panel animate-float-soft relative w-[220px] rounded-[1.75rem] p-4 shadow-glow">
      <div className="flex items-start gap-3">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-pink-300 via-rose-300 to-amber-200 text-slate-950 shadow-lg shadow-pink-500/20">
          <span className="absolute left-3 top-4 h-1.5 w-1.5 rounded-full bg-slate-950" />
          <span className="absolute right-3 top-4 h-1.5 w-1.5 rounded-full bg-slate-950" />
          <span className="absolute bottom-4 h-2 w-4 rounded-full border-b-2 border-slate-950/80" />
          <span className="absolute -right-2 top-1 h-5 w-5 rounded-full bg-white/70 blur-sm" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-xs uppercase tracking-[0.24em] text-white/45">Guide mode</div>
          <div className="mt-1 text-sm font-semibold text-white">Benim işim akışa tatlılık katmak.</div>
          <p className="mt-2 text-xs leading-5 text-white/68">
            Kartlar, sonuç ekranları ve geçişler daha sıcak hissetsin diye buradayım.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/38">
        <span className="h-2 w-2 rounded-full bg-emerald-300" />
        stay cute, stay premium
      </div>
    </div>
  );
}