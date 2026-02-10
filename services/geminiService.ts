import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { Freelancer, Job, MatchResult } from "../types";

const GEMINI_API_KEY = "AIzaSyBOQW68qolbzBHcbjdOsthFjrQLeeov4B0";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const analyzeMatch = async (job: Job, freelancer: Freelancer): Promise<MatchResult> => {
  if (!GEMINI_API_KEY) {
    // Fallback for demo if no key is present
    console.warn("No API Key found for Gemini. Returning mock score.");
    return {
      freelancerId: freelancer.id,
      score: Math.floor(Math.random() * 40) + 60, // Random 60-100
      reasoning: "API Key missing. Mock reasoning: Skills align well with requirements."
    };
  }

  const prompt = `
    Analyze the compatibility between the following Job and Freelancer for the Indian market context.
    
    Job:
    Title: ${job.title}
    Description: ${job.description}
    Required Skills: ${job.skillsRequired.join(", ")}
    Budget: ${job.budget} INR
    Location: ${job.location}

    Freelancer:
    Name: ${freelancer.name}
    Role: ${freelancer.role}
    Skills: ${freelancer.skills.join(", ")}
    Rate: ${freelancer.hourlyRate} INR/hr
    Location: ${freelancer.location}
    Languages: ${freelancer.languages.join(", ")}

    Provide a compatibility score (0-100) and a short reasoning sentence (max 20 words) explaining why.
    Consider language overlap and location proximity as a plus for "localized" work.
  `;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            score: { type: SchemaType.INTEGER },
            reasoning: { type: SchemaType.STRING }
          },
          required: ["score", "reasoning"]
        }
      }
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    if (!text) throw new Error("No response from Gemini");

    const parsedResult = JSON.parse(text);
    return {
      freelancerId: freelancer.id,
      score: parsedResult.score,
      reasoning: parsedResult.reasoning
    };

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      freelancerId: freelancer.id,
      score: 0,
      reasoning: "AI Analysis failed."
    };
  }
};

export const createChatSession = (userRole: string) => {
  if (!GEMINI_API_KEY) return null;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `You are HiveMind, an intelligent AI assistant for the Work Hive platform. The user is a ${userRole}. 
    Your goal is to help them navigate the platform, understand features like Escrow and AI Matching, and provide general advice on ${userRole === 'client' ? 'hiring and project management' : 'freelancing and career growth'}.
    Keep your responses concise, professional, and helpful. Do not provide code unless explicitly asked.`
  });

  return model.startChat();
};