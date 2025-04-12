
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const prompt = `Please correct the grammar of the following sentence:\n\n"${text}"`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const corrected = response.choices[0].message.content;
  return NextResponse.json({ result: corrected });
}
