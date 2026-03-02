// plugins/cum.js → CUM SUPER FINO Y REALISTA (solo 50% del ancho)
import { webp2png } from '../lib/webp2mp4.js'
import { Sticker } from 'wa-sticker-formatter'
import Jimp from 'jimp'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply(`Responde a un sticker o imagen con *.cum*`)

  const q = m.quoted
  const mime = (q.msg || q).mimetype || q.mtype || ''
  if (!/image|sticker/.test(mime)) return m.reply(`Solo imágenes y stickers`)

  try {
    const media = await q.download()
    const imgBuffer = await webp2png(media)
    const base = await Jimp.read(imgBuffer)

    const cum = await Jimp.read(path.join(__dirname, '../src/cum.png'))

    const size = 512
    base.contain(size, size, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)

    // ← AHORA SÍ: ultra fino
    const nuevoAncho = Math.round(size * 0.48)   // 48% del ancho → chorrito perfecto
    const nuevoAlto = size                        // mantiene la altura completa
    cum.resize(nuevoAncho, nuevoAlto)

    // Centrado perfecto
    const x = Math.round((size - nuevoAncho) / 2)  // centrado horizontal
    const y = 0                                    // pega desde arriba

    base.composite(cum, x, y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1.0   // tal cual está tu png, sin tocar color ni transparencia
    })

    const finalBuffer = await base.getBufferAsync(Jimp.MIME_PNG)

    const sticker = new Sticker(finalBuffer, {
      pack: m.pushName || "Fantasmin",
      author: "fantasmin bot",
      type: 'full',
      quality: 95
    })

    await conn.sendMessage(m.chat, { sticker: await sticker.toBuffer() }, { quoted: m })

  } catch (err) {
    console.log(err)
    m.reply('Error echando la leche')
  }
}

handler.command = /^(cum|lechazo|cummer|leche|cumple)$/i
handler.tags = ['sticker', 'nsfw']
handler.help = ['cum']
export default handler