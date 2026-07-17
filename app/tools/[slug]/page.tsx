import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

import { getExperienceBySlug, experiences } from "@/lib/experiences";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AiMessageAnalysisDemo } from "@/components/experience-flows/ai-message-analysis-demo";
import { AiFirstImpressionDemo } from "@/components/experience-flows/ai-first-impression-demo";
import { AiRelationshipAnalysisDemo } from "@/components/experience-flows/ai-relationship-analysis-demo";
import { FriendKnowledgeDemo } from "@/components/experience-flows/friend-knowledge-demo";
import { FirstDateSimulatorDemo } from "@/components/experience-flows/first-date-simulator-demo";
import { FutureScenarioDemo } from "@/components/experience-flows/future-scenario-demo";

export function generateStaticParams() {
  return experiences.map((experience) => ({ slug: experience.slug }));
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Button variant="ghost" asChild>
          <Link href="/tools">
            <ArrowLeft className="h-4 w-4" /> Geri dön
          </Link>
        </Button>
        <Badge className="bg-white/10 text-white/75">{experience.estimate}</Badge>
      </div>

      {slug === "ai-mesaj-analizi" ? <AiMessageAnalysisDemo /> : null}
      {slug === "ai-ilk-izlenim" ? <AiFirstImpressionDemo /> : null}
      {slug === "birbirinizi-ne-kadar-taniyorsunuz" ? <FriendKnowledgeDemo /> : null}
      {slug === "first-date-simulator" ? <FirstDateSimulatorDemo /> : null}
      {slug === "ai-gelecek-senaryosu" ? <FutureScenarioDemo /> : null}
      {slug === "ai-iliski-analizi" ? <AiRelationshipAnalysisDemo /> : null}

      {slug === "ai-mesaj-analizi" || slug === "ai-ilk-izlenim" || slug === "birbirinizi-ne-kadar-taniyorsunuz" || slug === "first-date-simulator" || slug === "ai-gelecek-senaryosu" || slug === "ai-iliski-analizi" ? (
        <div className="mt-10" />
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="bg-white/[0.05]">
          <CardHeader>
            <Badge className="w-fit bg-white/10 text-white/75">{experience.category}</Badge>
            <CardTitle className="text-3xl sm:text-4xl">{experience.title}</CardTitle>
            <CardDescription className="text-base">{experience.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-base leading-8 text-white/72">{experience.description}</p>

            <div className="grid gap-3 sm:grid-cols-3">
              {experience.steps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div className="text-sm leading-6 text-white/72">{step}</div>
                </div>
              ))}
            </div>

            <div className={`rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${experience.accent} p-[1px]`}>
              <div className="rounded-[1.75rem] bg-slate-950/85 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm text-white/70">
                  <Sparkles className="h-4 w-4 text-amber-200" />
                  Beklenen çıktı
                </div>
                <div className="text-lg font-semibold text-white">{experience.outcome}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.05]">
          <CardHeader>
            <CardTitle>Bu sayfanın sonraki hali</CardTitle>
            <CardDescription>
              Buraya gerçek form, yükleme akışı, AI sonucunun UI’ı ve paylaşım paneli gelecek.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Kullanıcı girdisi",
              "AI sonuç kartı",
              "Paylaşılabilir özet",
              "Kayıt / davet linki"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-4 text-sm text-white/72">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {item}
              </div>
            ))}

            <div className="rounded-3xl border border-dashed border-white/12 bg-white/[0.03] p-6 text-sm leading-7 text-white/62">
              Bu yapı Vercel deploy için sade tutuldu. Sonraki adımda AI API entegrasyonu ve upload akışını ekleyebiliriz.
            </div>

            <Button className="w-full" asChild>
              <Link href="/tools">Kataloğa dön</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}