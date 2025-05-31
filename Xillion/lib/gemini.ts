export const getGeminiResponse = async (query: string): Promise<string> => {
  const apiKey = 'AIzaSyBJP3Yz7FZYn1l47feF3_aRk4Ly_o9p5WE'; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [{ parts: [{ text: query }] }],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, no response received."
    );
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error fetching response.";
  }
};
