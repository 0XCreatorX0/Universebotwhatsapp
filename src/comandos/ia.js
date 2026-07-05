import { consultarGemini } from '../lib/gemini.js'
import { guardarMsg, obtenerHistorial } from '../lib/base_datos.js'

export async function ejecutar(bot, remitente, texto) {
  const pregunta = texto.slice(4).trim()
  if (!pregunta) return await bot.sendMessage(remitente, { text: '❌ Usa: .ia tu pregunta' })

  await bot.sendMessage(remitente, { text: '🤖 Consultando a Gemini...' })
  const historial = obtenerHistorial(remitente)
  const respuesta = await consultarGemini(pregunta, historial)

  guardarMsg(remitente, 'user', pregunta)
  guardarMsg(remitente, 'model', respuesta)

  await bot.sendMessage(remitente, { text: respuesta })
}

