import 'dotenv/config'
import makeWASocket, { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, Browsers } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'
import { procesarMensaje } from './gestor_eventos.js'

const RUTA_SESION = `${process.env.CARPETA_PRIVADO}/sesion`

export async function arrancarBot() {
  const { state, guardarCredenciales } = await useMultiFileAuthState(RUTA_SESION)
  const { version } = await fetchLatestBaileysVersion()

  const bot = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    browser: Browsers.macOS('Universebotwhatsapp'),
    keepAliveIntervalMs: 15000
  })

  bot.ev.on('creds.update', guardarCredenciales)

  bot.ev.on('connection.update', datos => {
    const { connection, lastDisconnect, pairingCode } = datos
    if (connection === 'close') {
      const reconectar = new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
      console.log(`\n⚠️ Desconectado: ${lastDisconnect?.error?.message}`)
      if (reconectar) {
        console.log('🔄 Reconectando en 5 segundos...')
        setTimeout(arrancarBot, 5000)
      } else {
        console.log('❌ Sesión finalizada. Borra la carpeta /privado/sesion para volver a vincular.')
      }
    } else if (connection === 'open') {
      console.log('\n✅ UNIVERSEBOTWHATSAPP CONECTADO Y LISTO!')
    }
    if (pairingCode) {
      console.log('\n🔑 CÓDIGO DE VINCULACIÓN:', pairingCode)
      console.log('👉 WhatsApp > Ajustes > Dispositivos vinculados > Vincular con código\n')
    }
  })

  bot.ev.on('messages.upsert', async datos => {
    await procesarMensaje(bot, datos.messages[0])
  })
}

