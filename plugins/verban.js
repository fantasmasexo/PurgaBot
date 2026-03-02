/*---------------------------------------------------------------------------------------
  By fantasma @uszo
  Alberto Y Ashly
  CheckBan WhatsApp - API: consultas.cc
-----------------------------------------------------------------------------------------*/
import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let numero = ''

  if (m.isGroup && m.mentionedJid?.[0]) {
    const jid = m.mentionedJid[0]
    try {
      const contact = await conn.getContactById(jid)
      numero = contact.number || jid.split('@')[0]
    } catch {
      numero = jid.split('@')[0]
    }
  }
  else if (text) {
    numero = text.match(/wa\.me\/(\d+)/)?.[1] || text.replace(/[^0-9]/g, '')
  } else {
    return m.reply(`Falta el número o mención\n\nEjemplo:\n• ${usedPrefix + command} 50588889999\n• ${usedPrefix + command} @usuario`)
  }

  numero = numero.replace(/[^0-9]/g, '')
  if (numero.length < 10 || numero.length > 15) {
    return m.reply(`Número inválido.\nDebe tener entre 10 y 15 dígitos.\nEj: ${usedPrefix + command} 5215512345678`)
  }

  try {
    const { data } = await axios.get(`https://consultas.cc/apis/whatsapp/checkban.php?numero=${numero}`)

    let estado
    if (data.banido === true) {
      estado = `*Número suspendido* 🚫\n${data.message || ''}`
    } else if (data.banido === false) {
      estado = `*Número activo* ✅\n${data.message || ''}`
    } else {
      estado = 'La API devolvió una respuesta desconocida.'
    }

    m.reply(
`${estado.split('\n')[0]}
${estado.split('\n').slice(1).join('\n') || ''}`
    )

  } catch (err) {
    console.error(err)
    m.reply('Error al conectar con la API. Intenta más tarde.')
  }
}

handler.help = ['checkban', 'wa']
handler.tags = ['tools']
handler.command = /^(checkban|wa|bancheck|verban)$/i
export default handler