import youtubedl from 'youtube-dl-exec'
import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'

const CARPETA_TEMP = `${process.env.CARPETA_PRIVADO}/temp`
await fs.mkdir(CARPETA_TEMP, { recursive: true })

export async function descargarAudio(consulta) {
  const archivo = path.join(CARPETA_TEMP, `${Date.now()}.mp3`)
  await youtubedl(`ytsearch1:${consulta} canción completa`, {
    extractAudio: true, audioFormat: 'mp3', audioQuality: 320, output: archivo, noWarnings: true
  })
  return archivo
}

export async function descargarVideo(consulta) {
  const archivo = path.join(CARPETA_TEMP, `${Date.now()}.mp4`)
  await youtubedl(`ytsearch5:${consulta}`, {
    format: 'best[ext=mp4]', mergeOutputFormat: 'mp4', output: archivo, noWarnings: true
  })
  return archivo
}
 
