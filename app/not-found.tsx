import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <Card className="w-full bg-white/[0.05]">
        <CardHeader>
          <CardTitle>Bu sayfa bulunamadı</CardTitle>
          <CardDescription>
            Aradığın deneyim henüz oluşmamış olabilir. Kataloğa dönüp başka bir mini ürüne geçebilirsin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/tools">Kataloğa dön</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}