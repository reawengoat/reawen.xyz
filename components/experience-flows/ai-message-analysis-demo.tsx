"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Check, Copy, ImageUp, MessageSquareText, Sparkles, RotateCcw, Loader2, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Insight = {
  label: string;
  value: string;
  tone: string;
};

type GroqAnalysis = {
  headline: string;
  summary: string;
  engagement: number;
  balance: number;
  tension: number;
  insights: Insight[];
};

const promptPresets = [
  "Bana dürüst söyle, burada kim daha ilgili görünüyor?",
  "Bu konuşma flört mü, yoksa sadece arkadaşça mı?",
  "Aradaki sessizlik normal mi, gerilim mi var?"
];

const defaultResult: GroqAnalysis = {
  headline: "Sonucu görmek için bir sohbet gir",
  summary: "Sohbeti gönderdiğinde burada yorum kartı görünecek.",
  engagement: 0,
  balance: 0,
  tension: 0,
  insights: [
    { label: "Sohbet enerjisi", value: "beklemede", tone: "Hazır" },
    { label: "Güç dengesi", value: "beklemede", tone: "Hazır" },
    { label: "Risk sinyali", value: "beklemede", tone: "Hazır" },
    { label: "Kısa yorum", value: "ilk analiz için bir sohbet ekle", tone: "Hazır" }
  ]
};

export function AiMessageAnalysisDemo() {
  const [message, setMessage] = useState("");
  const [context, setContext] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(promptPresets[0]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [result, setResult] = useState<GroqAnalysis>(defaultResult);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasResult = result.engagement > 0 || result.balance > 0 || result.tension > 0 || result.headline !== defaultResult.headline;
  const averageScore = useMemo(
    () => Math.round((result.engagement + result.balance + (100 - result.tension)) / 3),
    [result]
  );

  const shareSummary = useMemo(() => {
    if (!hasResult) {
      return "Önce sohbet gir, sonra sonuç kartını paylaş.";
    }

    return [
      `Sohbet analizi: ${result.headline}`,
      `Özet: ${result.summary}`,
      `Enerji ${result.engagement}/100, denge ${result.balance}/100, gerilim ${result.tension}/100`,
      `Bağlam: ${context || "eklenmedi"}`,
      `Seçilen soru: ${selectedPreset}`
    ].join("\n");
  }, [context, hasResult, result, selectedPreset]);

  const handleAnalyze = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/groq/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          context,
          preset: selectedPreset,
          uploadedFileName
        })
      });

      const data = (await response.json()) as GroqAnalysis & { error?: string; details?: string };

      if (!response.ok) {
        throw new Error(data.error || data.details || "Groq analysis failed.");
      }

      setResult(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Analiz alınamadı.");
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
    setUploadedFileName(null);
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
            <CardTitle className="text-3xl sm:text-4xl">AI mesaj analizini hemen dene</CardTitle>
            <CardDescription className="text-base">
              Sohbetten bir bölüm yapıştır, kısa bir bağlam ekle ve Groq’dan gelen yorumu anında gör.
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

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/75">Mesaj / sohbet metni</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Buraya WhatsApp, DM ya da bir sohbetten birkaç satır yapıştır..."
                  className="min-h-[180px] w-full rounded-[1.25rem] border border-white/10 bg-slate-950/55 px-4 py-3 text-sm leading-7 text-white outline-none transition focus:border-white/20"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/75">Kısa bağlam</span>
                <input
                  value={context}
                  onChange={(event) => setContext(event.target.value)}
                  placeholder="Örn: 2 haftadır konuşuyoruz, cevaplar biraz yavaşladı"
                  className="h-12 w-full rounded-[1.25rem] border border-white/10 bg-slate-950/55 px-4 text-sm text-white outline-none transition focus:border-white/20"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-[1.25rem] border border-dashed border-white/12 bg-white/[0.03] px-4 py-4 text-sm text-white/70 transition hover:bg-white/[0.05]">
                <span className="flex items-center gap-3">
                  <ImageUp className="h-4 w-4 text-white/55" />
                  Ekran görüntüsü ekle
                </span>
                <span className="text-xs uppercase tracking-[0.22em] text-white/35">isteğe bağlı</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => setUploadedFileName(event.target.files?.[0]?.name ?? null)}
                />
              </label>
              {uploadedFileName ? <div className="text-xs text-white/45">Seçilen dosya: {uploadedFileName}</div> : null}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                {isLoading ? "Groq analiz ediyor" : "Analizi üret"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.05]">
          <CardHeader>
            <Badge className="w-fit bg-white/8 text-white/70">Sonuç kartı</Badge>
            <CardTitle className="text-3xl sm:text-4xl">{result.headline}</CardTitle>
            <CardDescription className="text-base">
              Groq yanıtı geldikçe bu alan anında güncellenir ve paylaşılabilir sonuç kartı gibi çalışır.
            </CardDescription>
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
              {[
                ["Enerji", result.engagement],
                ["Denge", result.balance],
                ["Gerilim", result.tension]
              ].map(([label, value]) => (
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
                <MessageSquareText className="h-4 w-4 text-white/45" />
                {selectedPreset}
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/45">
                <Sparkles className="h-3.5 w-3.5 text-white/60" />
                share-ready result
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{result.headline}</h3>
              <p className="mt-3 text-base leading-8 text-white/82">{result.summary}</p>
            </div>

            <div className="rounded-[1.75rem] border border-white/8 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-5 shadow-glow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.26em] text-white/38">Poster</div>
                  <div className="mt-2 text-xl font-semibold text-white">{result.headline}</div>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/65">
                    Bu kart, arkadaşına atabileceğin kısa özet gibi davranır. Fazla uzun değil, doğrudan sonuç veriyor.
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/80">
                  ✦
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["Enerji", result.engagement],
                  ["Denge", result.balance],
                  ["Gerilim", result.tension]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/8 bg-slate-950/45 p-4">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</div>
                    <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
                    <div className="mt-2 h-2 rounded-full bg-white/8">
                      <div className="h-2 rounded-full bg-white/45" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/8 bg-slate-950/50 p-4 text-sm leading-7 text-white/72">
                {shareSummary}
              </div>
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
              <span>Analiz toplam skoru</span>
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

      <Card className="bg-white/[0.04]">
        <CardHeader>
          <CardTitle className="text-2xl">Nasıl kullanılır?</CardTitle>
          <CardDescription>
            İlk sürüm için hızlı akış: metni yapıştır, bağlamı yaz, sonucu oluştur. Görsel OCR ve diğer akışlar daha sonra genişletilebilir.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {[
            "1. Sohbetten birkaç satır yapıştır",
            "2. Bağlamı tek cümleyle açıkla",
            "3. Sonucu paylaşılabilir kart olarak kullan"
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 text-sm leading-6 text-white/72">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}