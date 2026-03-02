const handler = async (m, { conn, text }) => {
  let who

  if (m.quoted?.sender) {
    who = m.quoted.sender
  } else if (m.mentionedJid?.[0]) {
    who = m.mentionedJid[0]
  } else if (text) {
    let numero = text.replace(/[^0-9]/g, '')
    if (numero.length < 10) return m.reply('⚠️ Número inválido. Usa el código de país.\nEj: *.pfp +505555555*')
    who = numero + '@s.whatsapp.net'
  } else {
    who = m.sender
  }

  try {
    const ppUrl = await conn.profilePictureUrl(who, 'image')
    const nombre = await conn.getName(who)
    const numeroLimpio = who.split('@')[0]

    await conn.sendMessage(
      m.chat,
      {
        image: { url: ppUrl },
        caption: `Pfp de @${numeroLimpio}\nBy *uszo bot*`,
        mentions: [who]
      },
      { quoted: m }
    )

  } catch {
    const numeroLimpio = who.split('@')[0]
    m.reply(`El usuario @${numeroLimpio} no tiene foto de perfil o la tiene privada.`, null, { mentions: [who] })
  }
}

handler.help = ['pfp (número / reply / @)']
handler.tags = ['tools']
handler.command = /^(pfp|foto|perfil|profile|pp)$/i

export default handler
