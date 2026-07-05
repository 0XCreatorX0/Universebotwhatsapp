import axios from 'axios'
import 'dotenv/config'

const CLAVE = process.env.GEMINI_CLAVE
const MODELO = process.env.GEMINI_MODELO
const URL = `https://generativelanguage.googleapis.com/v1/models/${MODELO}:generateContent?key=${CLAVE}`

export async function consultarGemini(consulta, historial = []) {
  try {
    const mensajes = [
      { role: 'user', parts: [{ text: 'Responde en español claro, directo y sin explicaciones innecesarias.' }] },
      ...historial.map(m => ({
        role: m.rol === 'user' ? 'user' : 'model',
        parts: [{ text: m.contenido }]
      })),
      { role: 'user', parts: [{ text: consulta }] }
    ]

    const resp = await axios.post(URL, {
      generationConfig: { temperature: 0.7 },
      contents: mensajes
    }, { timeout: 30000 })

    return resp.data.candidates[0].content.parts[0].text.trim()
  } catch (err) {
    return `❌ Error Gemini: ${err.response?.data?.error?.message || err.message}`
  }
}

