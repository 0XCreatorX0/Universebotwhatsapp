import { limpiarHistorial } from '../lib/base_datos.js'

export async function ejecutar(bot, remitente, comando) {
  if (comando === '.limpiar') {
    limpiarHistorial(remitente)
    return await bot.sendMessage(remitente, { text: '🧹 Memoria limpiada correctamente.' })
  }
  if (comando === '.estado') {
    return await bot.sendMessage(remitente, { text: '✅ Universebotwhatsapp activo y funcionando 24/7.' })
  }
}
 
