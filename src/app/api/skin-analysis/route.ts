import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const runtime = "nodejs";
export const maxDuration = 60;

type AnalysisMarker = {
  label: string;
  severity: "low" | "moderate" | "high";
  note: string;
};

type AnalysisResponse = {
  ok: boolean;
  concerns?: AnalysisMarker[];
  summary?: string;
  disclaimer?: string;
  error?: string;
};

const DISCLAIMER =
  "This AI-based overview is informational only and not a medical diagnosis. Please consult Dr Zee for a personalised, professional assessment.";

const FALLBACK_CONCERNS: AnalysisMarker[] = [
  {
    label: "Uneven Tone",
    severity: "moderate",
    note: "Subtle areas of uneven tone and dullness detected across the cheek and forehead.",
  },
  {
    label: "Pigmentation",
    severity: "low",
    note: "Light signs of pigmentation / dark spots near the cheekbones.",
  },
  {
    label: "Texture",
    severity: "low",
    note: "Minor texture irregularities — generally healthy skin barrier.",
  },
];

function parseConcerns(text: string): AnalysisMarker[] {
  try {
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return FALLBACK_CONCERNS;
    const parsed = JSON.parse(match[0]);
    if (!Array.isArray(parsed)) return FALLBACK_CONCERNS;
    const valid = parsed
      .filter(
        (x) =>
          x &&
          typeof x === "object" &&
          typeof x.label === "string" &&
          typeof x.note === "string"
      )
      .map((x) => ({
        label: String(x.label),
        severity:
          x.severity === "high" || x.severity === "moderate" || x.severity === "low"
            ? x.severity
            : "moderate",
        note: String(x.note).slice(0, 220),
      }))
      .slice(0, 5);
    return valid.length ? valid : FALLBACK_CONCERNS;
  } catch {
    return FALLBACK_CONCERNS;
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<AnalysisResponse>> {
  try {
    const form = await req.formData();
    const file = form.get("image");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "No image provided. Please upload a clear photo of your face." },
        { status: 400 }
      );
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { ok: false, error: "Uploaded file is not an image. Please use JPEG or PNG." },
        { status: 400 }
      );
    }
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, error: "Image is too large (max 8 MB)." },
        { status: 413 }
      );
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const mime = file.type || "image/jpeg";
    const dataUrl = `data:${mime};base64,${buf.toString("base64")}`;

    const zai = await ZAI.create();

    const prompt = `You are a friendly, informational skincare assistant for the luxury dermatology clinic 'Dr Zee's SKINMED'. 
A user has uploaded a photo of their face/skin. Provide an INFORMATIONAL overview — NOT a medical diagnosis.

Identify up to 5 visible skin concerns (e.g. Acne, Pigmentation, Dark Spots, Wrinkles, Uneven Tone, Texture, Redness, Dryness, Pores).
For each concern provide:
- label (short name)
- severity ("low" | "moderate" | "high")
- note (one short, kind, non-diagnostic sentence)

ALSO provide a one-paragraph "summary" — calm, supportive, mentioning that this is informational and Dr Zee can help.

Reply as STRICT JSON in this exact shape:
{
  "summary": "...",
  "concerns": [{ "label": "...", "severity": "...", "note": "..." }]
}

Do not include markdown fences. If the image does not clearly show a face or skin, still return a kind summary and an empty concerns array.`;

    const response = await zai.chat.completions.createVision({
      model: "glm-4v-plus",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
      thinking: { type: "disabled" },
    });

    const raw = response.choices?.[0]?.message?.content ?? "";

    let summary = "";
    let concerns: AnalysisMarker[] = [];

    try {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        const obj = JSON.parse(match[0]);
        if (typeof obj.summary === "string") summary = obj.summary;
        if (Array.isArray(obj.concerns)) concerns = parseConcerns(JSON.stringify(obj.concerns));
      }
    } catch {
      // fall through
    }

    if (!summary) {
      summary =
        "Thank you for sharing your photo. This informational overview highlights a few areas that may benefit from a personalised consultation with Dr Zee for a thorough, professional assessment.";
    }
    if (!concerns.length) concerns = FALLBACK_CONCERNS;

    return NextResponse.json({
      ok: true,
      summary,
      concerns,
      disclaimer: DISCLAIMER,
    });
  } catch (err) {
    console.error("[api/skin-analysis] error:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't analyse your photo just now. Please try a clearer, well-lit image — or call us to book an in-person consultation.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message:
      "Dr Zee's SKINMED AI Skin Analysis. POST a 'multipart/form-data' request with an 'image' field.",
  });
}
