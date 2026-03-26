export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Responde breve y claro: ${message}`,
      }),
    });

    const data = await response.json();

    const text = data.output_text || "No pude generar una respuesta.";

    res.status(200).json({ reply: text });
  } catch (error) {
    res.status(500).json({ error: "Error al conectar con OpenAI" });
  }
}
