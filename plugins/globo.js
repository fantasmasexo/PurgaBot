// plugins/globo.js → Exactamente como tu .cum (sin recortar ni nada extra)
import { webp2png } from '../lib/webp2mp4.js'
import { Sticker } from 'wa-sticker-formatter'
import Jimp from 'jimp'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply(`Responde a un sticker o imagen con *.globo*`)

  const q = m.quoted
  const mime = (q.msg || q).mimetype || q.mtype || ''
  if (!/image|sticker/.test(mime)) return m.reply(`Solo imágenes y stickers`)

  try {
    const media = await q.download()
    const imgBuffer = await webp2png(media)
    const base = await Jimp.read(imgBuffer)

    const globo = await Jimp.read(path.join(__dirname, '../src/globo.png'))

    const memeWidth = 600
    const memeHeight = 420

    base.resize(memeWidth, memeHeight)
    globo.resize(memeWidth, Jimp.AUTO)

    const totalHeight = memeHeight + globo.bitmap.height
    const final = new Jimp(memeWidth, totalHeight, 0x00000000)

    final.composite(globo, 0, 0)
    final.composite(base, 0, globo.bitmap.height)

    const outBuffer = await final.getBufferAsync(Jimp.MIME_PNG)

    const sticker = new Sticker(outBuffer, {
      pack: m.pushName || "Fantasmin",
      author: "fantasmin bot",
      type: 'full',
      quality: 90
    })

    await conn.sendMessage(m.chat, { sticker: await sticker.toBuffer() }, { quoted: m })

  } catch (err) {
    console.log(err)
    m.reply('Error al hacer el globo')
  }
}

handler.command = /^(globo|globito|burbuja|meme)$/i
handler.tags = ['sticker', 'meme']
handler.help = ['globo']
export default handler