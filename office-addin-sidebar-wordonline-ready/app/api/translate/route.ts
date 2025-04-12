
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const prompt = `Please translate the following text into English and make the tone professional:\n\n"${text}"`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const translated = response.choices[0].message.content;
  return NextResponse.json({ result: translated });
}
