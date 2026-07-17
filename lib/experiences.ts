export type Experience = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  badge: string;
  accent: string;
  estimate: string;
  outcome: string;
  steps: string[];
};

export const experiences: Experience[] = [
  {
    slug: "ai-mesaj-analizi",
    title: "AI Mesaj Analizi",
    subtitle: "Sohbeti gönder, anında okunabilir bir yorum kartı al.",
    description: "Ekran görüntüsü ya da metin yükle; ton, güç dengesi ve gerilim noktaları basit bir kartta toplansın.",
    category: "Sosyal Yorum",
    badge: "Canlı demo",
    accent: "from-pink-500 via-rose-500 to-orange-400",
    estimate: "30 sn",
    outcome: "Ton, enerji, güç dengesi ve kısa öneriler",
    steps: ["Sohbeti yapıştır", "Bağlamı ekle", "Sonucu paylaş"]
  },
  {
    slug: "ai-ilk-izlenim",
    title: "AI İlk İzlenim",
    subtitle: "Fotoğrafını yükle, insanların seni nasıl gördüğünü duymaya hazır ol.",
    description: "Tatlı, net ve paylaşılabilir ilk izlenim kartı üretir; ister ciddi ister eğlenceli ton seçersin.",
    category: "Profil Yorum",
    badge: "Fotoğraf yorumu",
    accent: "from-sky-500 via-cyan-500 to-emerald-400",
    estimate: "20 sn",
    outcome: "Karizma, vibe, styling ve sosyal enerji",
    steps: ["Fotoğrafını ekle", "Ton seç", "Yorumunu al"]
  },
  {
    slug: "birbirinizi-ne-kadar-taniyorsunuz",
    title: "Birbirinizi Ne Kadar Tanıyorsunuz?",
    subtitle: "Online test gibi çalışan, arkadaş grupları için hızlı oyun.",
    description: "Sorular, cevaplar ve puanlama üzerinden ilişki, arkadaşlık ya da ekip uyumu ölçer.",
    category: "Test / Oyun",
    badge: "Skor tabanlı",
    accent: "from-violet-500 via-fuchsia-500 to-pink-400",
    estimate: "2 dk",
    outcome: "Uyum skoru, doğru cevap oranı, mini analiz",
    steps: ["Testi oluştur", "Linki paylaş", "Sonucu karşılaştır"]
  },
  {
    slug: "grup-sohbet-analizi",
    title: "Grup Sohbet Analizi",
    subtitle: "Gruptaki herkesin kişilik tonunu çöz.",
    description: "Kim lider, kim kaos, kim ghost modunda; sohbet akışından karakter analizi çıkarır.",
    category: "Sohbet Analizi",
    badge: "Grup dinamiği",
    accent: "from-amber-400 via-orange-500 to-rose-500",
    estimate: "40 sn",
    outcome: "Rol dağılımı, mizah seviyesi, enerji grafiği",
    steps: ["Grup sohbetini ekle", "Katılımcıları etiketle", "AI raporunu gör"]
  },
  {
    slug: "ai-iliski-analizi",
    title: "AI İlişki Analizi",
    subtitle: "Bir ilişkinin ritmini ve sorun noktalarını yorumlar.",
    description: "Mesajlar, davranışlar ve test cevaplarıyla ilişki dinamiğini açıklayan bir yorum üretir.",
    category: "İlişki",
    badge: "Uyum raporu",
    accent: "from-emerald-500 via-teal-500 to-cyan-400",
    estimate: "1 dk",
    outcome: "Uyum, riskler, iletişim önerileri",
    steps: ["Bağlamı anlat", "Veriyi gir", "Sonuç kartını al"]
  },
  {
    slug: "roast-me-complement-me",
    title: "Roast Me / Compliment Me",
    subtitle: "AI seni acımasız ya da tatlı şekilde yorumlasın.",
    description: "Tek ekranda iki mod; biri eğlenceli dozda roast, diğeri sevimli ve motive edici yorumlar.",
    category: "Eğlence",
    badge: "Dual mode",
    accent: "from-rose-500 via-fuchsia-500 to-violet-500",
    estimate: "15 sn",
    outcome: "Komik yorum, paylaşılabilir sonuç, puan etiketi",
    steps: ["Modu seç", "Kısa profil ver", "Kartını paylaş"]
  },
  {
    slug: "anonim-mesaj",
    title: "Anonim Mesaj",
    subtitle: "NGL tarzı gizli mesaj kutusu.",
    description: "Link oluştur, arkadaşların anonim mesaj bıraksın, sen de güzel bir cevap deneyimi yaşa.",
    category: "Anonim",
    badge: "Paylaşılabilir link",
    accent: "from-neutral-600 via-slate-700 to-zinc-900",
    estimate: "10 sn",
    outcome: "Anonim mesajlar, cevap akışı, güvenli moderasyon",
    steps: ["Link oluştur", "Paylaş", "Mesajları oku"]
  },
  {
    slug: "kim-daha-cok",
    title: "Kim Daha Çok?",
    subtitle: "Çift oyunu, hızlı kıyas ve tatlı rekabet.",
    description: "Çiftler ya da arkadaşlar için eğlenceli karşılaştırma soruları ve skor tablosu.",
    category: "Çift Oyunu",
    badge: "Versus",
    accent: "from-amber-300 via-yellow-400 to-lime-400",
    estimate: "90 sn",
    outcome: "Kimin daha çok yaptığı, neye daha yatkın olduğu",
    steps: ["İkiliyi seç", "Soruları yanıtla", "Kazananı gör"]
  },
  {
    slug: "ai-gelecek-senaryosu",
    title: "AI Gelecek Senaryosu",
    subtitle: "Küçük bir kehanet ekranı gibi hissettirir.",
    description: "Kullanıcıdan ipuçları alır, ardından olası gelecek hikayesini eğlenceli bir dille anlatır.",
    category: "Senaryo",
    badge: "Kehanet modu",
    accent: "from-indigo-500 via-sky-500 to-cyan-300",
    estimate: "25 sn",
    outcome: "Tahmin, tavsiye ve sinematik kısa hikaye",
    steps: ["Girdileri seç", "Senaryoyu üret", "Paylaşılabilir kart al"]
  },
  {
    slug: "instagram-profil-judge",
    title: "Instagram Profil Judge",
    subtitle: "Profilini yorumlayan mini denetçi.",
    description: "Biyografi, görseller ve vibe üzerinden ilk izlenim puanı ve geliştirme önerileri üretir.",
    category: "Profil Denetimi",
    badge: "Judge card",
    accent: "from-purple-500 via-violet-500 to-blue-400",
    estimate: "35 sn",
    outcome: "Profil puanı, eksik alanlar, büyüme önerileri",
    steps: ["Profil bağlamını ekle", "Hedefi seç", "Raporu al"]
  },
  {
    slug: "first-date-simulator",
    title: "First Date Simulator",
    subtitle: "AI ile soru sorarak ilerleyen bir first date deneyimi.",
    description: "Kullanıcıya küçük seçimler yaptırır; doğal akışlı, komik ve paylaşılabilir bir date simülasyonu kurar.",
    category: "Simülasyon",
    badge: "Interactive date",
    accent: "from-pink-400 via-rose-400 to-orange-300",
    estimate: "3 dk",
    outcome: "Date puanı, risk anları, flört sinyalleri",
    steps: ["Karakteri seç", "Soruları yanıtla", "Final skorunu gör"]
  },
  {
    slug: "beni-ne-kadar-taniyorsun",
    title: "Beni Ne Kadar Tanıyorsun?",
    subtitle: "Testi oluştur, davet linkini paylaş, arkadaşların çözüp seni puanlasın.",
    description: "Kendi testini yap, isim toplama akışını yönet, doğru cevapları ve AI yorumunu sonradan gör.",
    category: "Paylaşımlı Test",
    badge: "Invite link",
    accent: "from-emerald-400 via-lime-400 to-yellow-300",
    estimate: "4 dk",
    outcome: "Başarı skoru, arkadaş analizi, eğlenceli yorum",
    steps: ["Test oluştur", "Link paylaş", "Sonuçları topla"]
  }
];

export const featuredExperiences = experiences.slice(0, 6);

export function getExperienceBySlug(slug: string) {
  return experiences.find((experience) => experience.slug === slug);
}