"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Brain, Ghost, Heart, MessageCircleMore, Sparkles, Wand2 } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { CuteMascot } from "@/components/cute-mascot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { featuredExperiences } from "@/lib/experiences";

const SignatureScene = dynamic(() => import("@/components/signature-scene").then((module) => module.SignatureScene), {
  ssr: false,
  loading: () => <div className="h-[340px] w-full rounded-[2rem] border border-white/10 bg-white/5" />
});

const GsapAccents = dynamic(() => import("@/components/gsap-accents").then((module) => module.GsapAccents), {
  ssr: false
});

const stackItems = ["Next.js", "TailwindCSS", "Groq", "Framer Motion", "Lenis"];

export default function HomePage() {
  return (
    <main className="relative">
      <GsapAccents />

      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-45" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-3xl space-y-7">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-white/8 text-white/70">Sosyal deneyimler stüdyosu</Badge>
              <Badge className="bg-white/8 text-white/65">Vercel deploy ready</Badge>
            </div>

            <div className="space-y-5">
              <h1 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Arkadaşlarınla oynanan, paylaşılabilir küçük deneyimler için bir stüdyo.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                Mesaj analizi, testler, anonim kutular ve ilişki oyunları tek bir sade ürün diliyle bir araya geliyor.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/tools">
                  Deneyimleri keşfet <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#catalog">Kataloğa bak</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="bg-white/[0.05]">
                <CardContent className="p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/85">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div className="text-sm text-white/58">Yorum dili</div>
                  <div className="mt-1 text-lg font-semibold text-white">Net ve kısa sonuçlar</div>
                </CardContent>
              </Card>
              <Card className="bg-white/[0.05]">
                <CardContent className="p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/85">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div className="text-sm text-white/58">Paylaşım</div>
                  <div className="mt-1 text-lg font-semibold text-white">Kart gibi görünen ekranlar</div>
                </CardContent>
              </Card>
              <Card className="bg-white/[0.05]">
                <CardContent className="p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/85">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="text-sm text-white/58">Ritim</div>
                  <div className="mt-1 text-lg font-semibold text-white">Az ama yerinde hareket</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-20 rounded-[2.5rem] bg-gradient-to-br from-white/6 via-white/[0.03] to-white/5 blur-2xl" />
            <div className="absolute -left-4 top-8 z-10 hidden rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-xl lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/85">
                  ⌁
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-white/40">Format</div>
                  <div className="text-sm font-medium text-white">Sade, okunaklı, paylaşılabilir</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-6 top-2 z-10 hidden opacity-80 lg:block">
              <CuteMascot />
            </div>
            <SignatureScene />
          </div>
        </div>

        <AnimatedSection className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]" delay={0.05}>
          <Card className="bg-white/[0.05]">
            <CardHeader>
              <CardTitle>Aktif yüzeyler</CardTitle>
              <CardDescription>
                Şu anda aktif olarak kullandığımız sistemler ve akışlar burada.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {[
                "AI Mesaj Analizi",
                "Groq API analizi",
                "Paylaşılabilir sonuç kartı",
                "Mobil menü"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.04] p-4 text-sm text-white/72">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/[0.05]">
            <CardHeader>
              <CardTitle>Teknoloji</CardTitle>
              <CardDescription>Şu an aktif olarak kullanılan temel katmanlar.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {stackItems.map((item) => (
                <Badge key={item} className="bg-white/6 text-white/78">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection id="catalog" className="space-y-6" delay={0.1}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/45">Aktif sistemler</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Şu an canlı olan yüzeyler</h2>
            </div>
            <Button variant="secondary" asChild className="hidden sm:inline-flex">
              <Link href="/tools">Tümünü aç</Link>
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredExperiences.slice(0, 1).map((experience) => (
              <Card key={experience.slug} className="group relative overflow-hidden bg-white/[0.05] transition-transform duration-300 hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${experience.accent} opacity-10 transition-opacity group-hover:opacity-20`} />
                <CardHeader className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <Badge className="bg-white/10 text-white/70">{experience.category}</Badge>
                  </div>
                  <CardTitle>{experience.title}</CardTitle>
                  <CardDescription>{experience.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <p className="text-sm leading-6 text-white/68">{experience.description}</p>
                  <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white/72">
                    <span>{experience.badge}</span>
                    <span>{experience.estimate}</span>
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
        </AnimatedSection>
      </section>
    </main>
  );
}