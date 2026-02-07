import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from './constants';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateResponse = async (
  prompt: string, 
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const modelId = 'gemini-3-flash-preview'; 
    
    // Construct the chat history for context
    // Note: The new SDK encourages keeping history on the client side for simple stateless calls
    // or using the Chat session. Here we will do a simple generateContent with system instruction.
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || "Sorry, I am having trouble connecting to the Red Sea server. Please try again.";
  } catch (error) {
    console.error("Gemini Text Error:", error);
    return "I apologize, something went wrong. Please check your connection.";
  }
};

export const analyzeStainImage = async (base64Image: string, promptText: string): Promise<string> => {
  try {
    // Clean the base64 string if it has the prefix
    const base64Data = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg for simplicity, though vision handles png/webp
              data: base64Data,
            },
          },
          {
            text: promptText || "Analyze this image. If it is a stain or dirt in an apartment, tell me how to clean it using common household items found in Egypt (Vinegar, Lemon, Baking Soda). Be concise."
          },
        ],
      },
    });

    return response.text || "I could not analyze the image clearly.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Failed to analyze image. Please try uploading a clearer photo.";
  }
};
