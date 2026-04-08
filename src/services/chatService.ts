import { askGemini } from "../lib/gemini";

export async function askGeminiProxy(message: string): Promise<string> {
  try {
    return await askGemini(message);
  } catch (error) {
    console.error("Chat Service Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later!";
  }
}
