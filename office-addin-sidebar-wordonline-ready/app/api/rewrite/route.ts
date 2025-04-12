
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { text, tone } = await req.json();
  const prompt = `Please rewrite the following text in a ${tone} tone:\n\n"${text}"`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const rewritten = response.choices[0].message.content;
  return NextResponse.json({ result: rewritten });
}
