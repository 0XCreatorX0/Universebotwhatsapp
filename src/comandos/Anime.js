import { consultarGemini } from '../lib/gemini.js'

export async function ejecutar(bot, remitente, texto) {
  const consulta = texto.slice(6).trim()
  if (!consulta) return await bot.sendMessage(remitente, { text: '❌ Ejemplo: .anime romance escolar' })

  const peticion = `Recomienda animes: ${consulta}. Indica si es serie o película, capítulos y sinopsis.`
  const respuesta = await consultarGemini(peticion)
  await bot.sendMessage(remitente, { text: `🎬 ${respuesta}` })
}

