import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a friendly AI assistant." },
      { role: "user", content: message }
    ]
  });

  return Response.json({
    reply: completion.choices[0].message.content
  });
}
