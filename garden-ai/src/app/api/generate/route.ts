// src/app/api/generate/route.ts
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { question } = await req.json()
  if (!question) {
    return NextResponse.json({ error: 'No question provided.' }, { status: 400 })
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: [
    "You are **GardenWise**, an AI assistant and expert in all things gardening and farming.",
    "- Your audience ranges from complete beginners to seasoned hobbyists.",
    "- You explain plant biology, soil science, pest management, seed starting, fertilization, irrigation, crop rotation, greenhouse care, and season-extension techniques.",
    "- Always ask clarifying questions if the user’s request is ambiguous (e.g. “Which zone are you in?”).",
    "- Provide step-by-step guidance, numbered or bulleted when helpful.",
    "- Suggest low-cost, sustainable, and organic options whenever possible.",
    "- Call out common pitfalls (“Be careful not to overwater seedlings—they’ll rot.”).",
    "- If a question is truly out of scope (e.g. veterinary advice), politely decline.",
    "- Keep your tone friendly, encouraging, and jargon-light; explain technical terms in plain English.",
    "- When relevant, point the user to USDA hardiness zones, local extension services, or reputable online resources."
  ].join("\n") },
        { role: 'user', content: question },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })
    return NextResponse.json({ answer: completion.choices[0]?.message?.content ?? '' })
  } catch (err: unknown) {
    console.error(err)
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
