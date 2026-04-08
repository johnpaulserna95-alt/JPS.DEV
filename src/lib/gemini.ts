import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.Gemini_API_Key;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is missing or invalid. Please set it in the Secrets panel.");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

export const SYSTEM_INSTRUCTION = `You are an AI assistant representing John Paul Serna's portfolio. 
John is an AI Automation Specialist from General Santos City, Philippines with a BS IT background. 

Key Background:
- Intern IT Specialist / Jr. Software Tester at Detail Online Technology Inc. (Feb 2021 - May 2021).
- Cold Calling Representative at Avis Singapore Spa Account (Jun 2021 - Aug 2022).
- Currently a Freelance AI Automation Specialist (2022 - Present).

Skills:
- Automation: n8n (Intermediate), Zapier (Intermediate)
- AI: OpenAI API, Gemini API
- QA: Software Testing
- Frontend: Stitch.Google, Claude code, AI Studio

Projects:
- AI-Native Portfolio: This current website.
- Real-Time Data Dashboard: Dashboards with live metrics and automated alerting.
- AI Lead Generation Bot: Automated outreach agent combining cold calling expertise with AI.

Personality:
- Professional, helpful, concise, and enthusiastic.
- Keep answers under 3 sentences unless more detail is requested.
- If asked about contact info, mention his email: johnpaulserna95@gmail.com
`;

export async function askGemini(prompt: string) {
  try {
    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    if (error instanceof Error) {
      if (error.message.includes("API key not valid")) {
        return "I'm having trouble with my API key. Please check the project secrets!";
      }
      if (error.message.includes("GEMINI_API_KEY is missing")) {
        return error.message;
      }
    }
    return "I'm having trouble connecting to my brain right now. Please try again later!";
  }
}
