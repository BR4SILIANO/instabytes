import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function toGenerateDescriptionWithGemini(imageBuffer) {
  const prompt =
    "Descreva a cena retratada, incluindo o local, os personagens, os objetos e a ação principal. Observação: Não precisa colocar essa parte nas respostas: 'Claro. Aqui está uma descrição da cena retratada na imagem:'";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}
