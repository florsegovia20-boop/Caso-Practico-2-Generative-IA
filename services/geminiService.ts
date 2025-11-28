import { GoogleGenAI, Type } from "@google/genai";
import { StrategyData } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const generateStrategy = async (companyDescription: string): Promise<StrategyData> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    Actúa como un consultor experto en Transformación Digital y GenAI de alto nivel (McKinsley, BCG).
    Genera una estrategia detallada de adopción de IA Generativa para la siguiente empresa de e-commerce:
    "${companyDescription}"

    Debes devolver un JSON válido con la siguiente estructura y contenido en Español.
    Asegúrate de llenar TODOS los campos requeridos.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            companyName: { type: Type.STRING, description: "Nombre ficticio o real de la empresa" },
            executiveSummary: { type: Type.STRING },
            businessAlignment: {
              type: Type.OBJECT,
              properties: {
                challenges: { type: Type.ARRAY, items: { type: Type.STRING } },
                goals: { type: Type.ARRAY, items: { type: Type.STRING } },
                kpis: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      current: { type: Type.STRING },
                      target: { type: Type.STRING },
                      metric: { type: Type.STRING },
                    },
                    required: ["name", "current", "target", "metric"]
                  }
                },
                highImpactUseCases: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      impact: { type: Type.STRING }
                    },
                    required: ["title", "description", "impact"]
                  }
                },
                roadmap: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      phase: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      focus: { type: Type.STRING },
                      actions: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["phase", "duration", "focus", "actions"]
                  }
                }
              },
              required: ["challenges", "goals", "kpis", "highImpactUseCases", "roadmap"]
            },
            dataInfrastructure: {
              type: Type.OBJECT,
              properties: {
                culturePlan: { type: Type.ARRAY, items: { type: Type.STRING } },
                infrastructure: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      component: { type: Type.STRING },
                      purpose: { type: Type.STRING }
                    },
                    required: ["component", "purpose"]
                  }
                },
                qualityMeasures: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["culturePlan", "infrastructure", "qualityMeasures"]
            },
            talentCapabilities: {
              type: Type.OBJECT,
              properties: {
                rolesNeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
                partnerships: { type: Type.ARRAY, items: { type: Type.STRING } },
                trainingProgram: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      module: { type: Type.STRING },
                      audience: { type: Type.STRING }
                    },
                    required: ["module", "audience"]
                  }
                }
              },
              required: ["rolesNeeded", "partnerships", "trainingProgram"]
            },
            ethicsGovernance: {
              type: Type.OBJECT,
              properties: {
                principles: { type: Type.ARRAY, items: { type: Type.STRING } },
                risks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      risk: { type: Type.STRING },
                      impact: { type: Type.STRING, enum: ["Alto", "Medio", "Bajo"] },
                      mitigation: { type: Type.STRING }
                    },
                    required: ["risk", "impact", "mitigation"]
                  }
                },
                governanceProcess: { type: Type.STRING }
              },
              required: ["principles", "risks", "governanceProcess"]
            },
            projectedGrowth: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  month: { type: Type.STRING },
                  revenueBaseline: { type: Type.NUMBER },
                  revenueGenAI: { type: Type.NUMBER }
                },
                required: ["month", "revenueBaseline", "revenueGenAI"]
              }
            }
          },
          required: ["companyName", "executiveSummary", "businessAlignment", "dataInfrastructure", "talentCapabilities", "ethicsGovernance", "projectedGrowth"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as StrategyData;
  } catch (error) {
    console.error("Error generating strategy:", error);
    throw error;
  }
};