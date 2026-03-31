import OpenAI from "openai";

export async function POST(req: Request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const { input, options } = await req.json();

  const response = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: `You are an expert conflict resolution mediator and organizational psychologist. You specialize in generating comprehensive, structured mediation frameworks and communication strategies. Draw from interest-based negotiation (Fisher & Ury), BATNA analysis, and established mediation frameworks. Be thorough, empathetic, and practical. Format output with clear markdown headers and structured sections.`,
      },
      {
        role: "user",
        content: `Generate a comprehensive conflict resolution and mediation framework:

${input}

Please generate a complete package including:

# Conflict Resolution & Mediation Framework

## 1. Conflict Type Assessment
Classify this conflict and explain why.

## 2. Interest Mapping
Shared, compatible, and conflicting interests between parties.

## 3. BATNA Analysis
Best alternatives to negotiated agreement for both parties.

## 4. Recommended Approach & Strategy
Mediation approach best suited for this conflict.

## 5. Facilitated Conversation Agenda
Step-by-step agenda for a facilitated dialogue.

## 6. Key Messages for Each Party
What each party should hear and how to frame it.

## 7. Draft Agreement Framework
Template for addressing core issues.

## 8. Follow-Up & Monitoring Plan
Ensuring the agreement holds and the relationship heals.

## 9. Quick Wins
Small, immediate steps to de-escalate the situation.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  return Response.json({ output: response.choices[0].message.content });
}
