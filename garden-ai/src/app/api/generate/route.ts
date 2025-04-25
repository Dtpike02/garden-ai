// src/app/api/generate/route.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/authOptions'; // Verify path
import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Define the expected structure for chat messages (matching OpenAI's format)
interface ChatMessage {
    role: 'user' | 'assistant' | 'system'; // Roles OpenAI expects
    content: string;
}

// Expect an array of messages in the request body
interface PostRequestBody {
    messages: ChatMessage[]; // Changed from 'prompt'
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
    }

    let messages: ChatMessage[] | undefined;
    try {
        // Expect 'messages' array in the body
        const body: PostRequestBody = await req.json();
        messages = body.messages;
    } catch (error) {
       console.error("Error parsing request body:", error);
       return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    // Optional: Ensure the last message is from the user for context
    if (messages[messages.length - 1].role !== 'user') {
         return NextResponse.json({ error: 'Conversation flow error: last message must be from user' }, { status: 400 });
    }

    try {
        // --- Prepare messages for OpenAI ---
        // You can prepend the system message here if it's not part of the history sent from the client
        const messagesToSend: ChatMessage[] = [
            { role: 'system', content: 'You are an expert gardening assistant.' },
            ...messages // Add the history received from the client
        ];
        // Or, if the client sends the full history including the system prompt:
        // const messagesToSend = messages;

        console.log(`Sending ${messagesToSend.length} messages to OpenAI...`);

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messagesToSend, // Pass the full conversation history
            max_tokens: 800, // Adjust token limit as needed
        });

        const content = completion.choices?.[0]?.message?.content?.trim() ?? 'AI did not provide a response.';

        // Return only the latest AI response text
        return NextResponse.json({ text: content });

    } catch (error) {
         console.error("Error calling OpenAI API:", error);
         let errorMessage = 'Failed to fetch response from AI';
         if (error instanceof OpenAI.APIError) {
            errorMessage = `OpenAI API Error: ${error.status} ${error.message}`;
         } else if (error instanceof Error) {
             errorMessage = error.message;
         }
         return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}