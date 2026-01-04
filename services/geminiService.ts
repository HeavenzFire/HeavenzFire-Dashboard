
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateResponse(prompt: string, imageBase64?: string) {
    const parts: any[] = [{ text: prompt }];
    
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64.split(',')[1] || imageBase64
        }
      });
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
          systemInstruction: "You are the HeavenzFire AI assistant. You help developers build multimodal applications using local LLMs (Ollama) and cloud APIs. You are technical, concise, and focused on helping users with code-gen and vision tasks. Always provide production-ready code snippets."
        }
      });

      return response.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "An error occurred while communicating with the AI. Check your API key.";
    }
  }
}

export const geminiService = new GeminiService();
