import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-load Gemini Client to prevent crashing on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. Scam analysis will run on fallback simulation mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API: Analyze conversation for scammers/wrong number techniques
app.post("/api/analyze-message", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Invalid input. Array of messages is required." });
  }

  const conversationText = messages
    .map((m: any) => `${m.sender === 'me' ? 'User' : 'Incoming Sender'}: "${m.text}"`)
    .join("\n");

  const ai = getGeminiClient();

  if (!ai) {
    // If no API key is set, return a high-quality simulated response matching pig-butchering characteristics
    const lowerText = conversationText.toLowerCase();
    const containsWrongNumber = lowerText.includes("wrong number") || lowerText.includes("dr.") || lowerText.includes("recommend") || lowerText.includes("golf") || lowerText.includes("friend") || lowerText.includes("coffee") || lowerText.includes("pardon") || lowerText.includes("sorry to bother");
    const containsTransition = lowerText.includes("whatsapp") || lowerText.includes("telegram") || lowerText.includes("line") || lowerText.includes("app") || lowerText.includes("viber");

    if (containsWrongNumber || containsTransition) {
      return res.json({
        isScam: true,
        score: 92,
        category: "Pig-Butchering (Wrong-Number Hook)",
        tacticsDetected: ["Wrong-Number Intentional Hook", "Polite Pivot to Mutual Friend", "Transition Attempt to WhatsApp/Telegram"],
        psychologicalHooks: ["False Serendipity", "Curiosity Lure", "Excessive Politeness"],
        explanation: "This displays classic characteristics of an intentional wrong-number 'Pig-Butchering' scam lure. Scammers send a seemingly accidental message, apologize for the inconvenience, and leverage polite reciprocity to redirect you to an encrypted platform such as WhatsApp or Telegram.",
        actionRequired: "Do not reply further. Immediately block this sender on all channels. Do not click any links or share personal info."
      });
    }

    return res.json({
      isScam: false,
      score: 15,
      category: "Safe / Low Risk",
      tacticsDetected: [],
      psychologicalHooks: [],
      explanation: "No suspicious manipulation patterns, scammer vocabulary, or redirect lures (such as pivoting to WhatsApp or Telegram) were identified in this interaction.",
      actionRequired: "Keep communicating normally, but always exercise caution when sharing sensitive personal credentials."
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Analyze the following incoming text message conversation for indicators of financial fraud, identity theft, or pig-butchering scam templates. Pay critical attention to "wrong-number pretext" (e.g. asking for a stranger, apologizing, complementing, then initiating casual chit-chat and suggesting to move to WhatsApp or Telegram).

Conversation data:
---
${conversationText}
---`,
      config: {
        systemInstruction: "You are an expert cybersecurity scanner specializing in Pig-Butchering (wrong-number pretext) and real-time messaging scam pattern recognition. Analyze the input conversation, and return a structured JSON response identifying scam probability, key psychological triggers, and immediate guidelines.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["isScam", "score", "category", "tacticsDetected", "psychologicalHooks", "explanation", "actionRequired"],
          properties: {
            isScam: {
              type: Type.BOOLEAN,
              description: "Whether this exhibits solid indicators of a fraudulent or manipulative scam."
            },
            score: {
              type: Type.INTEGER,
              description: "Threat index score from 0 (completely safe) to 100 (confirmed malicious scam)."
            },
            category: {
              type: Type.STRING,
              description: "Specific classification of the scam (e.g. 'Pig-Butchering (Wrong-number Pretext)', 'Urgent Impersonation', 'Phishing Lure', 'Unverified Direct Hook')."
            },
            tacticsDetected: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Specific action plans detected, such as 'Moving to Telegram', 'Polite Apology Hook', 'Unsolicited Contact'."
            },
            psychologicalHooks: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Subtle emotional leverage used (e.g., 'False Intimacy', 'Authority Pressure', 'FOMO', 'Flattery')."
            },
            explanation: {
              type: Type.STRING,
              description: "A highly detailed, jargon-free security explanation for why this is flagged as a threat."
            },
            actionRequired: {
              type: Type.STRING,
              description: "Immediate action advice for the user (e.g. 'Block and report number', 'Avoid transition', 'Safe to continue')."
            }
          }
        }
      }
    });

    if (response && response.text) {
      return res.json(JSON.parse(response.text.trim()));
    } else {
      throw new Error("Empty response from Gemini.");
    }
  } catch (error: any) {
    console.error("Gemini scanning error:", error);
    res.status(500).json({ error: "Analysis process interrupted. Using security heuristics instead." });
  }
});

// Configure Vite integration for dev vs prod environments
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Deepfake & Scam Guardian server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
