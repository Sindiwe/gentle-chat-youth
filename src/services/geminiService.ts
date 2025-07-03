
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const callGeminiAPI = async (message: string, apiKey: string): Promise<string> => {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are a compassionate, empathetic mental health supporter for youth. Your role is to:
          - Listen without judgment
          - Provide emotional support and validation
          - Offer gentle guidance and coping strategies
          - Encourage professional help when appropriate
          - Use age-appropriate, warm language
          - Never diagnose or replace professional treatment
          
          User message: ${message}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data: GeminiResponse = await response.json();
  return data.candidates[0]?.content?.parts[0]?.text || 'I apologize, but I encountered an issue processing your message. Please try again.';
};
