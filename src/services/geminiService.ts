import { GoogleGenAI } from "@google/genai";
import { TeamStats, PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getMatchAnalysis(teamA: TeamStats, teamB: TeamStats, probs: { winA: number, winB: number, draw: number }): Promise<string> {
  const prompt = `
    As an expert football analyst, provide a deep tactical prediction for a match between ${teamA.name} and ${teamB.name}.
    
    ${teamA.name} Stats:
    - Overall: ${teamA.overall}
    - Attack: ${teamA.attack}, Midfield: ${teamA.midfield}, Defense: ${teamA.defense}
    - Form: ${teamA.form}/100, Fitness: ${teamA.fitness}/100
    - Tactics: ${teamA.tactics}
    
    ${teamB.name} Stats:
    - Overall: ${teamB.overall}
    - Attack: ${teamB.attack}, Midfield: ${teamB.midfield}, Defense: ${teamB.defense}
    - Form: ${teamB.form}/100, Fitness: ${teamB.fitness}/100
    - Tactics: ${teamB.tactics}
    
    Calculated Win Probabilities:
    - ${teamA.name}: ${probs.winA}%
    - ${teamB.name}: ${probs.winB}%
    - Draw: ${probs.draw}%
    
    Provide a concise but insightful analysis covering:
    1. Key tactical battle (e.g. midfield dominance vs counter-attack).
    2. Impact of form and fitness.
    3. Final score prediction and reasoning.
    Use Markdown formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Analysis unavailable.";
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "Failed to generate AI analysis. Please check your connection.";
  }
}
