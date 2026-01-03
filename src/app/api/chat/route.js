import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: message },
      ],
    });

    const reply = chatCompletion.choices[0]?.message?.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Groq error:", error);
    return NextResponse.json(
      { reply: "Groq API error" },
      { status: 500 }
    );
  }
}