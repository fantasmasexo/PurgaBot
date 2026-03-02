import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

const handler = async (m, { conn }) => {
  const texto = `✨ Pulsa el botón para unirte o visitar nuestros espacios oficiales`.trim()

  const buttons = [
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: ` ${emoji} Canal oficial`,
        url: 'https://whatsapp.com/channel/0029VbBE6MOKmCPViwlNFv0o',
        merchant_url: 'https://whatsapp.com/channel/0029VbBE6MOKmCPViwlNFv0o'
      })
    },
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: `${emoji} Grupo oficial`,
        url: 'http://bit.ly/3ImhCFl',
        merchant_url: 'http://bit.ly/3ImhCFl'
      })
    },
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: `${emoji} Creador`,
        url: 'https://wa.link/i3ytgw',
        merchant_url: 'https://wa.link/i3ytgw'
      })
    },
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: `${emoji} Regálanos una estrella en Github`,
        url: 'https://github.com/xdlol',
        merchant_url: 'https://github.com/xdlol'
      })
    }
   ]

  const messageContent = {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({ text: texto }),
          footer: proto.Message.InteractiveMessage.Footer.create({ text: ` ${botname} by Fantasma` }),
          header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons
          })
        })
      }
    }
  }

  const msg = generateWAMessageFromContent(m.chat, messageContent, {
    userJid: m.sender,
    quoted: m
  })

  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

handler.help = ['grupos'];
handler.tags = ['info'];
handler.command = ['grupos', 'links', 'groups'];

export default handler;