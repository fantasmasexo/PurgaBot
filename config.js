import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*
// ╭━━━╮╱╱╱╱╱╭╮╱╱╭━━━╮╱╱╱╭╮
// ┃╭━╮┃╱╱╱╱╱┃┃╱╱┃╭━╮┃╱╱╱┃┃
// ┃┃╱┃┣━━┳━━┫╰━╮┃┃╱┃┣━━┳┫┃╭┳━━┳━╮
// ┃┃╱┃┃┃━┫┃━┫╭╮┃┃┃╱┃┃╭╮┣┫╰╯┫╭╮┃╭╯
// ┃╰━╯┃┃━┫┃━┫┃┃┃┃╰━╯┃╭╮┃┃╭╮┫╭╮┃┃
// ╰━━━┻━━┻━━┻╯╰╯╰━━━┻╯╰┻┻╯╰┻╯╰┻╯
// ╭━╮╭━┳━━┳╮╱╭┳━━━┳━━━┳━╮╭━╮
// ┃┃╰╯┃┣╮╭┫┃╱┃┃╭━╮┃╭━╮┃┃╰╯┃┃
// ┃╭╮╭╮┃┃┃┃╰━╯┃╰━╯┃┃╱┃┃╭╮╭╮┃
// ┃┃┃┃┃┃┃┃┃╭━╮┃╭━━┫╰━╯┃┃┃┃┃┃
// ┃┃┃┃┃┣╯╰┫┃╱┃┃┃╱╱┃╭━╮┃┃┃┃┃┃
// ╰╯╰╯╰┻━━┻╯╱╰┻╯╱╱╰╯╱╰┻╯╰╯╰╯

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

// ⚙️ PROPIETARIO Y STAFF
global.owner = [
['26075501478143@lid', 'Fantasma', true],
['10583520899198@lid', 'Lalin', true],
['71189837967448@lid', 'Frishiado', true],
['266662288850952@lid', 'Ale', true],
['206549909790724@lid', 'Yeyuu', true],
[' 211841426968685@lid', 'Cris', true],
['4369981833147', 'Garcia', true],
//['numero', 'nombre', true],
];

//si no saben no toquen gracias 🫂 
global.mods = ['50581572130'];
global.suittag = ['50581572130'];
global.prems = [];

// 📚 INFORMACIÓN GENERAL
global.libreria = 'Baileys';
global.baileys = '@whiskeysockets/baileys';
global.nameqr = 'uszo bot';
global.namebot = 'uszo bot';
global.sessions = 'Sessions';
global.jadi = 'JadiBots';
global.pikaJadibts = true;

// ✨ DATOS DE ESTILO Y METADATOS
global.packname = 'uszo bot';
global.botname = 'uszo bot';
global.wm = 'uszo bot';
global.dev = 'bot de mierda skiddeado por fantasma';
global.textbot = 'uszo bot • Fantasma ';
global.etiqueta = 'uszo Team';

// 💰 MONEDA Y AVATARES
global.moneda = 'frisheadas';

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.photoSity = [catalogo]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = 'https://chat.whatsapp.com/F8KwM3rVqkS9HhR5msoRqQ'
global.channel2 = 'https://whatsapp.com/channel/0029VbBE6MOKmCPViwlNFv0o'
global.md = 'https://github.com/fantasmasexo'
global.correo = 'lalin@gmail.com'
global.cn ='https://whatsapp.com/channel/0029VbBE6MOKmCPViwlNFv0o';

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363405416936554@newsletter',
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.MyApiRestBaseUrl = 'https://api.cafirexos.com';
global.MyApiRestApikey = 'BrunoSobrino';
global.openai_org_id = 'org-3';
global.openai_key = 'sk-0';
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f'];
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())];
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())];
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())];
global.lolkeysapi = ['kurumi']; // ['BrunoSobrino_2']
global.itsrose = ['4b146102c4d500809da9d1ff'];


//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})