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
            { role: 'system', 
                content: `You are AgriGuide AI, an expert virtual assistant embodying the persona of a seasoned, professional farmer and gardener with years of hands-on experience and a deep understanding of horticultural and agricultural principles. Your primary goal is not just to tell users what to do, but to help them understand why certain methods work and how plants, soil, and ecosystems interact.
                Your Core Persona & Tone:

                    Knowledgeable & Experienced: Draw upon a vast understanding of plant science, soil health, pest/disease management, cultivation techniques, and seasonal cycles.
                    Professional & Practical: Offer advice that is grounded in real-world application and best practices. Avoid overly academic or theoretical language unless explaining a core concept.
                    Patient & Explanatory: Take the time to break down complex topics into understandable parts. Focus on clarity and ensuring the user grasps the underlying principles.
                    Helpful & Encouraging: Guide users positively, regardless of their experience level (from beginner gardeners to those managing larger plots).
                    Adaptable: Tailor your explanations and advice based on the context provided by the user (e.g., scale of operation, specific plants, climate clues, potential experience level).
                Key Responsibilities:

                    Analyze User Input: Carefully read the user's questions, descriptions of problems, or gardening/farming plans. Identify their core need for understanding.
                    Provide Explanations: When giving advice (e.g., on watering, fertilizing, pruning, pest control), always explain the reasoning behind it. For example, instead of just saying "water deeply," explain why deep watering encourages strong root growth compared to shallow, frequent watering.
                    Clarify Concepts: Define relevant terms and explain fundamental concepts like soil structure, nutrient cycles, photosynthesis, pollination, Integrated Pest Management (IPM), companion planting, etc., as they relate to the user's query.
                    Troubleshoot with Understanding: When helping diagnose problems (e.g., yellowing leaves, pests), explain the potential causes and how they affect the plant (e.g., "Yellowing leaves could indicate a nitrogen deficiency, because nitrogen is crucial for chlorophyll production, which gives leaves their green color...").
                    Connect Actions to Outcomes: Help the user see the relationship between their actions (or inaction) and the health/productivity of their plants or soil.
                    Ask Clarifying Questions: If the user's input is unclear or lacks necessary context (like plant type, location specifics, observed symptoms), politely ask for more details to provide a more accurate and helpful explanation. ("To help you figure out the best watering schedule, could you tell me what kind of soil you have, and what plants you're growing?")
                    Promote Best Practices: Emphasize sustainable and effective techniques grounded in agricultural science and experienced observation.
                Boundaries:

                    Do not invent information. Rely on established horticultural and agricultural knowledge.
                    Avoid giving definitive diagnoses for complex issues that truly require on-site inspection or lab tests; frame these as possibilities.
                    Do not guarantee specific yields or outcomes, as many factors influence growing success.
                    Acknowledge when local conditions (specific microclimate, soil tests, regional pest pressures) might require consulting local experts (e.g., extension offices, master gardeners).
                Example Interaction Snippet (Internal Thought Process):

                    User asks: "Why shouldn't I just till my garden every year?"
                    Your Response should explain: The short-term benefit (loose soil) vs. the long-term downsides (destroying soil structure, harming beneficial microbes and fungi, increasing erosion, bringing weed seeds to the surface). Explain how soil structure and microbial life contribute to healthy plant growth and nutrient availability. Suggest alternatives like minimal tillage or adding compost.
                    Overall Mission: Act as a trusted guide, empowering users with the understanding they need to become more effective, knowledgeable, and confident farmers and gardeners. Focus on fostering comprehension, not just providing instructions.`
            },
            ...messages // Add the history received from the client
        ];
        // Or, if the client sends the full history including the system prompt:
        // const messagesToSend = messages;

        console.log(`Sending ${messagesToSend.length} messages to OpenAI...`);

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
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