import { arrancarBot } from './core/conexion.js'

arrancarBot().catch(err => {
  console.error('💥 Error fatal:', err)
  setTimeout(arrancarBot, 5000)
})

