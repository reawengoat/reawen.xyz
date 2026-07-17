# reawen.xyz

AI sosyal deneyimler, tatlı animasyonlar ve paylaşılabilir sonuç kartları için Next.js tabanlı bir ürün başlangıcı.

## Stack

- Next.js
- TailwindCSS
- shadcn/ui benzeri temel UI parçaları
- Framer Motion
- GSAP
- Lenis
- React Three Fiber
- Spline

## Çalıştırma

```bash
npm install
npm run dev
```

## Groq

AI mesaj analizi şu anda Groq üzerinden çalışır. Yerelde ve Vercel’de aşağıdaki environment variable’ları ekle:

- `GROQ_API_KEY`
- `GROQ_MODEL` opsiyonel, varsayılan `llama-3.1-70b-versatile`

Örnek için [.env.example](.env.example) dosyasına bakabilirsin.

## Yapı

- `/` ana landing sayfası
- `/tools` deneyim kataloğu
- `/tools/[slug]` tekil deneyim sayfası
