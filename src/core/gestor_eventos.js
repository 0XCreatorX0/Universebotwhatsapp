import { ejecutar as cmdIa } from '../comandos/ia.js'
import { ejecutar as cmdAnime } from '../comandos/anime.js'
import { ejecutar as cmdMusica } from '../comandos/musica.js'
import { ejecutar as cmdYoutube } from '../comandos/youtube.js'
import { ejecutar as cmdSistema } from '../comandos/sistema.js'

export async function procesarMensaje(bot, msg) {
  if (!msg.message || msg.key.fromMe) return
  const remitente = msg.key.remoteJid
  const texto = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
  const comando = texto.trim().toLowerCase()

  if (comando.startsWith('.ia ')) return await cmdIa(bot, remitente, texto)
  if (comando.startsWith('.anime ')) return await cmdAnime(bot, remitente, texto)
  if (comando.startsWith('.musica ')) return await cmdMusica(bot, remitente, texto)
  if (comando.startsWith('.youtube ')) return await cmdYoutube(bot, remitente, texto)
  if (comando === '.limpiar' || comando === '.estado') return await cmdSistema(bot, remitente, comando)
}
 
