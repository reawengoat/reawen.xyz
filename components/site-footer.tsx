import Link from "next/link";

const activeSystems = [
  { label: "AI Mesaj Analizi", href: "/tools/ai-mesaj-analizi" },
  { label: "AI İlk İzlenim", href: "/tools/ai-ilk-izlenim" },
  { label: "AI İlişki Analizi", href: "/tools/ai-iliski-analizi" },
  { label: "Aktif sistemler", href: "/tools" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-slate-950/75">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="text-lg font-semibold tracking-tight text-white">reawen.xyz</div>
          <p className="max-w-xl text-sm leading-7 text-white/62">
            Küçük, paylaşılabilir sosyal deneyimler. Şu an aktif olan yüzeyler üzerinden ilerliyoruz.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-white/35">Aktif sistemler</div>
            <div className="mt-3 space-y-2">
              {activeSystems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-white/72 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-white/35">Durum</div>
            <div className="mt-3 space-y-2 text-sm text-white/72">
              <div>Groq bağlı</div>
              <div>Mobil menü mevcut</div>
              <div>Aktif sistemler yayında</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}