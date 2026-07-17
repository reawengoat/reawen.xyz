"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white">
            <span className="text-lg font-semibold leading-none">r</span>
          </div>
          <div className="leading-tight">
            <div className="text-base font-semibold tracking-tight text-white">reawen.xyz</div>
          </div>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="secondary" size="sm" asChild>
            <Link href="/tools">Aktif sistemler</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white md:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`mx-auto w-full max-w-7xl px-4 transition-all duration-300 sm:px-6 lg:px-8 md:hidden ${
          open ? "max-h-80 pb-4 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="rounded-[1.5rem] border border-white/8 bg-slate-950/95 p-4">
          <div className="grid gap-3">
            <Button variant="secondary" asChild className="w-full justify-between">
              <Link href="/" onClick={() => setOpen(false)}>
                Ana sayfa
              </Link>
            </Button>
            <Button variant="secondary" asChild className="w-full justify-between">
              <Link href="/tools" onClick={() => setOpen(false)}>
                Aktif sistemler
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}