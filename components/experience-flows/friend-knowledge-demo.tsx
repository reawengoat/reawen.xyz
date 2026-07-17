"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Check, Copy, Loader2, RotateCcw, Sparkles, TriangleAlert, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Insight = { label: string; value: string; tone: string };
type GroqAnalysis = {
  headline: string;
  summary: string;
  engagement: number;
  balance: number;
  tension: number;
  insights: Insight[];
};

const promptPresets = [
  "Birbirimizin favorilerini gerçekten biliyor muyuz?",
  "Bu ikili ne kadar aynı frekansta?",
  "Cevaplar uyumlu mu, yoksa tahmin mi ediyoruz?"
];

const defaultResult: GroqAnalysis = {
  headline: "İsimleri ve kısa cevapları gir, skor üretelim",
  summary: "İki kişi arasındaki tanışıklık seviyesi ve cevap uyumu burada yorumlanır.",
  engagement: 0,
  balance: 0,
  tension: 0,
  insights: [
    { label: "Tanışıklık", value: "beklemede", tone: "Hazır" },
    { label: "Uyum", value: "beklemede", tone: "Hazır" },
    { label: "Tahmin riski", value: "beklemede", tone: "Hazır" },
    { label: "Kısa not", value: "cevapları girince yorum oluşur", tone: "Hazır" }
  ]
};

export function FriendKnowledgeDemo() {
  const [personA, setPersonA] = useState("");
  const [personB, setPersonB] = useState("");
  const [message, setMessage] = useState("");
  const [context, setContext] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(promptPresets[0]);
  const [result, setResult] = useState<GroqAnalysis>(defaultResult);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasResult = result.headline !== defaultResult.headline || result.engagement > 0;
  const averageScore = useMemo(
    () => Math.round((result.engagement + result.balance + (100 - result.tension)) / 3),
    [result]
  );

  const shareSummary = hasResult
    ? [
        `Test: ${result.headline}`,
        `Özet: ${result.summary}`,
        `Tanışıklık ${result.engagement}/100, uyum ${result.balance}/100, risk ${result.tension}/100`,
        `Kişiler: ${personA || "A"} / ${personB || "B"}`,
        `Seçilen soru: ${selectedPreset}`
      ].join("\n")
    : "Önce iki kişiyi ve kısa cevapları gir, sonra sonucu paylaş.";

  const handleAnalyze = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/groq/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `A: ${personA || "Kişi A"}\nB: ${personB || "Kişi B"}\nYanıtlar: ${message}`,
          context,
          preset: selectedPreset,
          experience: "birbirinizi-ne-kadar-taniyorsunuz"
        })
      });

      const data = (await response.json()) as GroqAnalysis & { error?: string; details?: string };

      if (!response.ok) {
        throw new Error(data.error || data.details || "Groq analysis failed.");
      }

      setResult(data);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Analiz alınamadı.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareSummary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const handleReset = () => {
    setPersonA("");
    setPersonB("");
    setMessage("");
    setContext("");
    setResult(defaultResult);
    setCopied(false);
    setError(null);
    setSelectedPreset(promptPresets[0]);
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <Card className="bg-white/[0.05]">
          <CardHeader>
            <Badge className="w-fit bg-white/8 text-white/70">Groq destekli demo</Badge>
            <CardTitle className="text-3xl sm:text-4xl">Birbirinizi ne kadar tanıyorsunuz?</CardTitle>
            <CardDescription className="text-base">
              İki kişi, kısa cevaplar ve tek kartlık hızlı bir tanışıklık skoru.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleAnalyze}>
              <div className="grid gap-3 sm:grid-cols-3">
                {promptPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setSelectedPreset(preset)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                      selectedPreset === preset
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-white/8 bg-white/[0.03] text-white/68 hover:bg-white/[0.06]"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-white/75">Kişi A</span>
                  <input
                    value={personA}
                    onChange={(event) => setPersonA(event.target.value)}
                    placeholder="Örn: Ece"
                    className="h-12 w-full rounded-[1.25rem] border border-white/10 bg-slate-950/55 px-4 text-sm text-white outline-none transition focus:border-white/20"
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-white/75">Kişi B</span>
                  <input
                    value={personB}
                    onChange={(event) => setPersonB(event.target.value)}
                    placeholder="Örn: Mert"
                    className="h-12 w-full rounded-[1.25rem] border border-white/10 bg-slate-950/55 px-4 text-sm text-white outline-none transition focus:border-white/20"
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/75">Kısa cevaplar</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Örn: favori yemek, sevdiği dizi, doğum günü, küçük bir anı..."
                  className="min-h-[160px] w-full rounded-[1.25rem] border border-white/10 bg-slate-950/55 px-4 py-3 text-sm leading-7 text-white outline-none transition focus:border-white/20"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/75">Bağlam</span>
                <input
                  value={context}
                  onChange={(event) => setContext(event.target.value)}
                  placeholder="Örn: 3 aydır yakın arkadaşlar, ekip oyunu gibi"
                  className="h-12 w-full rounded-[1.25rem] border border-white/10 bg-slate-950/55 px-4 text-sm text-white outline-none transition focus:border-white/20"
                />
              </label>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                {isLoading ? "Groq analiz ediyor" : "Uyum skorunu üret"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.05]">
          <CardHeader>
            <Badge className="w-fit bg-white/8 text-white/70">Sonuç kartı</Badge>
            <CardTitle className="text-3xl sm:text-4xl">{result.headline}</CardTitle>
            <CardDescription className="text-base">Cevaplar geldikçe bu kart canlı olarak güncellenir.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <div className="flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <div className="font-medium">Groq yanıt vermedi</div>
                  <div className="mt-1 leading-6 text-rose-100/80">{error}</div>
                </div>
              </div>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-3">
              {[["Tanışıklık", result.engagement], ["Uyum", result.balance], ["Risk", result.tension]].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</div>
                  <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
                  <div className="mt-2 h-2 rounded-full bg-white/8">
                    <div className="h-2 rounded-full bg-white/45" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] border border-white/8 bg-slate-950/55 p-5">
              <div className="flex items-center gap-2 text-sm text-white/65">
                <Users className="h-4 w-4 text-white/45" />
                {selectedPreset}
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/45">
                <Sparkles className="h-3.5 w-3.5 text-white/60" />
                share-ready result
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{result.headline}</h3>
              <p className="mt-3 text-base leading-8 text-white/82">{result.summary}</p>
            </div>

            <div className="space-y-3">
              {result.insights.map((insight) => (
                <div key={insight.label} className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-white">{insight.label}</div>
                      <div className="mt-1 text-sm text-white/65">{insight.value}</div>
                    </div>
                    <Badge className="bg-white/8 text-white/60">{insight.tone}</Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/65">
              <span>Tanışıklık skoru</span>
              <span className="font-semibold text-white">{averageScore} / 100</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button type="button" variant="secondary" onClick={handleCopy} className="w-full">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Kopyalandı" : "Sonucu kopyala"}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset} className="w-full">
                <RotateCcw className="h-4 w-4" />
                Sıfırla
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}