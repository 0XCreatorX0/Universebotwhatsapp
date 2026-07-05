import { descargarVideo } from '../lib/descargas.js'
import fs from 'fs/promises'

export async function ejecutar(bot, remitente, texto) {
  const datos = texto.slice(9).trim()
  if (!datos.includes('|')) return await bot.sendMessage(remitente, { text: '❌ Usa: .YouTube nombre video | canal' })

  const [nom, canal] = datos.split('|', 2).map(t => t.trim())
  await bot.sendMessage(remitente, { text: `📹 Buscando: ${nom} de ${canal}...` })
  try {
    const ruta = await descargarVideo(`${nom} ${canal}`)
    await bot.sendMessage(remitente, { video: { url: ruta }, mimetype: 'video/mp4', caption: `📹 ${nom}` })
    await fs.unlink(ruta)
  } catch (e) {
    await bot.sendMessage(remitente, { text: `❌ Error: ${e.message}` })
  }
}
 
