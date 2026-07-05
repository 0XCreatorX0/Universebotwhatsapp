import { descargarAudio } from '../lib/descargas.js'
import fs from 'fs/promises'

export async function ejecutar(bot, remitente, texto) {
  const nombre = texto.slice(7).trim()
  if (!nombre) return await bot.sendMessage(remitente, { text: '❌ Usa: .musica canción - artista' })

  await bot.sendMessage(remitente, { text: `🎵 Buscando: ${nombre}...` })
  try {
    const ruta = await descargarAudio(nombre)
    await bot.sendMessage(remitente, { audio: { url: ruta }, mimetype: 'audio/mpeg', fileName: `${nombre}.mp3` })
    await fs.unlink(ruta)
  } catch (e) {
    await bot.sendMessage(remitente, { text: `❌ Error: ${e.message}` })
  }
}

