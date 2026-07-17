"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Check, Copy, Loader2, RotateCcw, Sparkles, TriangleAlert } from "lucide-react";

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
  "Bu ilişkide ritim dengeli mi?",
  "Karşılıklı emek var mı, yoksa biri taşıyor mu?",
  "İletişimde riskli alan var mı?"
];

const defaultResult: GroqAnalysis = {
  headline: "İlişki detaylarını gir, resmi görelim",
  summary: "Kısa bağlamla birlikte Groq burada ilişki dinamiğini yorumlar.",
  engagement: 0,
  balance: 0,
  tension: 0,
  insights: [
    { label: "Ritim", value: "beklemede", tone: "Hazır" },
    { label: "Karşılıklılık", value: "beklemede", tone: "Hazır" },
    { label: "Risk", value: "beklemede", tone: "Hazır" },
    { label: "Kısa yorum", value: "bağlam eklediğinde yorum çıkar", tone: "Hazır" }
  ]
};

export function AiRelationshipAnalysisDemo() {
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
        `İlişki analizi: ${result.headline}`,
        `Özet: ${result.summary}`,
        `Ritim ${result.engagement}/100, karşılıklılık ${result.balance}/100, risk ${result.tension}/100`,
        `Bağlam: ${context || "eklenmedi"}`,
        `Seçilen soru: ${selectedPreset}`
      ].join("\n")
    : "Önce birkaç satır ilişki bağlamı gir, sonra sonucu paylaş.";

  const handleAnalyze = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/groq/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          context,
          preset: selectedPreset,
          experience: "ai-iliski-analizi"
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
            <CardTitle className="text-3xl sm:text-4xl">AI ilişki analizini dene</CardTitle>
            <CardDescription className="text-base">Kısa bir ilişki bağlamı yaz, sonucu anında gör.</CardDescription>
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

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/75">İlişki bağlamı</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Birlikte ne kadar zamandır konuşuyorsunuz, akış nasıl, kim daha çok yazıyor?"
                  className="min-h-[180px] w-full rounded-[1.25rem] border border-white/10 bg-slate-950/55 px-4 py-3 text-sm leading-7 text-white outline-none transition focus:border-white/20"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/75">Kısa not</span>
                <input
                  value={context}
                  onChange={(event) => setContext(event.target.value)}
                  placeholder="Örn: 3 aydır görüşüyoruz, son hafta biraz soğuk"
                  className="h-12 w-full rounded-[1.25rem] border border-white/10 bg-slate-950/55 px-4 text-sm text-white outline-none transition focus:border-white/20"
                />
              </label>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                {isLoading ? "Groq analiz ediyor" : "İlişki analizini üret"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.05]">
          <CardHeader>
            <Badge className="w-fit bg-white/8 text-white/70">Sonuç kartı</Badge>
            <CardTitle className="text-3xl sm:text-4xl">{result.headline}</CardTitle>
            <CardDescription className="text-base">Groq sonucu geldikçe bu alan anında güncellenir.</CardDescription>
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
              {[["Ritim", result.engagement], ["Karşılıklılık", result.balance], ["Risk", result.tension]].map(([label, value]) => (
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
                <Sparkles className="h-4 w-4 text-white/45" />
                {selectedPreset}
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
              <span>İlişki skoru</span>
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