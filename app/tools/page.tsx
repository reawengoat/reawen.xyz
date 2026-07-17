import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experiences } from "@/lib/experiences";

const activeExperienceSlugs = [
  "ai-mesaj-analizi",
  "ai-ilk-izlenim",
  "birbirinizi-ne-kadar-taniyorsunuz",
  "first-date-simulator",
  "ai-gelecek-senaryosu",
  "ai-iliski-analizi"
];

const activeExperiences = activeExperienceSlugs
  .map((slug) => experiences.find((experience) => experience.slug === slug))
  .filter((experience): experience is (typeof experiences)[number] => Boolean(experience));

export default function ToolsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl space-y-4">
        <Badge className="bg-white/10 text-white/80">Aktif sistemler</Badge>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Şu an canlı olan deneyimler.
        </h1>
        <p className="text-lg leading-8 text-white/70">
          Bu sayfada yalnızca aktif olan yüzeyler gösterilir.
        </p>
      </div>

      <div className="glass-panel mt-8 rounded-[1.75rem] px-5 py-4 text-sm text-white/72">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-medium text-white">Şu an açık</div>
            <div>AI Mesaj Analizi, AI İlk İzlenim, Birbirinizi Ne Kadar Tanıyorsunuz?, First Date Simulator, AI Gelecek Senaryosu ve AI İlişki Analizi.</div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {activeExperiences.map((experience) => (
          <Card key={experience.slug} className="group bg-white/[0.05] transition-transform duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <Badge className="bg-white/10 text-white/75">{experience.category}</Badge>
                <Sparkles className="h-4 w-4 text-white/30 transition-colors group-hover:text-white/70" />
              </div>
              <CardTitle>{experience.title}</CardTitle>
              <CardDescription>{experience.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-white/68">{experience.description}</p>
              <div className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white/72">
                {experience.outcome}
              </div>
              <Button variant="secondary" className="w-full" asChild>
                <Link href={`/tools/${experience.slug}`}>
                  Aç <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}