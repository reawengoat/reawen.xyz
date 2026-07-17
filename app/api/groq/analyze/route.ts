import { NextResponse } from "next/server";

type AnalyzeRequest = {
  message?: string;
  context?: string;
  preset?: string;
  uploadedFileName?: string | null;
  experience?: string;
};

type AnalyzeResult = {
  headline: string;
  summary: string;
  engagement: number;
  balance: number;
  tension: number;
  insights: Array<{
    label: string;
    value: string;
    tone: string;
  }>;
};

const DEFAULT_MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY environment variable is missing." },
      { status: 500 }
    );
  }

  let body: AnalyzeRequest;

  try {
    body = (await request.json()) as AnalyzeRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = body.message?.trim() ?? "";
  const context = body.context?.trim() ?? "";
  const preset = body.preset?.trim() ?? "";
  const uploadedFileName = body.uploadedFileName?.trim() ?? "";
  const experience = body.experience?.trim() ?? "ai-mesaj-analizi";

  if (!message && !uploadedFileName) {
    return NextResponse.json(
      { error: "Please provide either message text or an uploaded file name." },
      { status: 400 }
    );
  }

  const prompt = [
    `You are generating a result for the reawen.xyz experience: ${experience}.`,
    "Return only valid JSON with the exact shape below and no markdown:",
    '{"headline":"string","summary":"string","engagement":number,"balance":number,"tension":number,"insights":[{"label":"string","value":"string","tone":"string"}]}',
    "Rules:",
    "- Keep the tone concise, human, and natural in Turkish.",
    "- Do not mention policies or that you are an AI.",
    "- Engagement, balance, and tension must be integers from 0 to 100.",
    "- insights must contain exactly 4 items: energy, power balance, risk signal, and short note.",
    "- Make the output suitable for a shareable results card.",
    experience === "ai-ilk-izlenim"
      ? "This is a first impression analysis based on a photo or profile context. Focus on vibe, charisma, clarity, and social energy."
      : experience === "birbirinizi-ne-kadar-taniyorsunuz"
        ? "This is a friend/partner knowledge quiz. Focus on answer consistency, mutual awareness, chemistry, and where the gap shows up."
        : experience === "ai-iliski-analizi"
          ? "This is a relationship analysis. Focus on emotional rhythm, reciprocity, and communication signs."
          : experience === "first-date-simulator"
            ? "This is a first date simulation. Focus on chemistry, timing, awkwardness, and playful social signals."
            : experience === "ai-gelecek-senaryosu"
              ? "This is a future scenario generator. Focus on fate-like storytelling, emotional stakes, and a cinematic but grounded vibe."
              : "This is a chat analysis. Focus on tone, balance, and tension.",
    `Preset question: ${preset || "none"}`,
    `Context: ${context || "none"}`,
    `Uploaded image file name: ${uploadedFileName || "none"}`,
    `Conversation: ${message}`
  ].join("\n");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You output only JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      {
        error: "Groq request failed.",
        details: errorText
      },
      { status: 502 }
    );
  }

  const json = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string | null;
      };
    }>;
  };

  const content = json.choices?.[0]?.message?.content;

  if (!content) {
    return NextResponse.json({ error: "Groq returned an empty response." }, { status: 502 });
  }

  let parsed: AnalyzeResult;

  try {
    parsed = JSON.parse(content) as AnalyzeResult;
  } catch {
    return NextResponse.json(
      {
        error: "Failed to parse Groq JSON response.",
        raw: content
      },
      { status: 502 }
    );
  }

  return NextResponse.json(parsed, { status: 200 });
}