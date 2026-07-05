import Database from 'better-sqlite3'
import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'

const RUTA_DB = `${process.env.CARPETA_PRIVADO}/memoria.db`
await fs.mkdir(path.dirname(RUTA_DB), { recursive: true })

const db = new Database(RUTA_DB)
db.exec(`
  CREATE TABLE IF NOT EXISTS conversaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    remitente TEXT NOT NULL,
    rol TEXT NOT NULL,
    contenido TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_remitente ON conversaciones(remitente);
`)

export function guardarMsg(remitente, rol, contenido) {
  db.prepare('INSERT INTO conversaciones (remitente, rol, contenido) VALUES (?, ?, ?)')
    .run(remitente, rol, contenido)
}

export function obtenerHistorial(remitente) {
  return db.prepare(`
    SELECT rol, contenido FROM conversaciones 
    WHERE remitente = ? ORDER BY fecha DESC LIMIT ?
  `).all(remitente, process.env.MAX_MENSAJES_POR_CHAT).reverse()
}

export function limpiarHistorial(remitente) {
  db.prepare('DELETE FROM conversaciones WHERE remitente = ?').run(remitente)
}

