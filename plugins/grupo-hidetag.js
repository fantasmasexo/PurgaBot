// ⚡✨ Pikachu Hidetag Style ✨⚡
// ╭━━━━━━━━━━━━━━━━━━━╮
// ┃ 🟡 𝑷𝒊𝒌𝒂𝒄𝒉𝒖 𝑯𝒊𝒅𝒆𝑻𝒂𝒈 ⚡
// ┃ 🐭 ¡Atrapa a todos con estilo!
// ╰━━━━━━━━━━━━━━━━━━━╯

import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import * as fs from 'fs'

var handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {


  //if (!m.quoted && !text) return conn.reply(m.chat, `⚡ Debes enviar un texto para hacer un tag.`, m, fake);

  try { 
    let users = participants.map(u => conn.decodeJid(u.id)) 
    const userId = m.mentionedJid?.[0] || m.sender
    let tagText = text ? text : (m.quoted && m.quoted.text ? m.quoted.text : "*saludos!* ⚡")

    let newText = `${tagText}\n\n> mensaje de: @${userId.split('@')[0]}`
    
    let q = m.quoted ? m.quoted : m || m.text || m.sender
    let c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender
    let msg = conn.cMod(
      m.chat, 
      generateWAMessageFromContent(
        m.chat, 
        { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c }}, 
        { quoted: null, userJid: conn.user.id }
      ), 
      newText, 
      conn.user.jid, 
      { mentions: users }
    )
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch {  

    let users = participants.map(u => conn.decodeJid(u.id))
    let quoted = m.quoted ? m.quoted : m
    let mime = (quoted.msg || quoted).mimetype || ''
    let isMedia = /image|video|sticker|audio/.test(mime)
    let more = String.fromCharCode(8206)
    let masss = more.repeat(850)
    let tagText = text ? text : (m.quoted && m.quoted.text ? m.quoted.text : "*¡Pika Pika saludos!* ⚡")

    let htextos = `${tagText}\n\n> mensaje de: @${userId.split('@')[0]}`

    if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos }, { quoted: null })
    } else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: null })
    } else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mp4', fileName: `HidetagPika.mp3` }, { quoted: null })
    } else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
      var mediax = await quoted.download?.()
      conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: null })
    } else {
      await conn.relayMessage(
        m.chat, 
        { extendedTextMessage: { text: `${masss}\n${htextos}\n`, contextInfo: { mentionedJid: users, externalAdReply: { thumbnail: icons, sourceUrl: redes, mentionedJid: [m.sender] } } } }, 
        {}
      )
    }
  }
}


handler.help = ['hidetag']
handler.tags = ['grupo']
handler.command = ['hidetag', 'notificar', 'notify', 'tag', 'n']
handler.group = true
handler.register = false
handler.admin = true


export default handler