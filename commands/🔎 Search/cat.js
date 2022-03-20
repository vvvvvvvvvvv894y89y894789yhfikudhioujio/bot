const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
module.exports = {
  name: "cat",
  category: "🔎 Search",
  usage: "cat",
  description: "Search Any Thing On cat.",
  run: async (client, message, args, cmduser, text, prefix) => {
            let owo = (await neko.sfw.meow());

            const cat = new Discord.MessageEmbed()
                  .setTitle("Random Cat Image")
                  .setImage(owo.url)
                  .setColor("#00d7ff")
                  .setFooter(client.user.username, "https://images-ext-1.discordapp.net/external/VVGTZQjNRaziH5kxOme_OaGFTmF13tsdEhcPrhs_2ZU/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/882819636763189278/d3504eb09b2f47359eb408540db6fabf.webp")
                  .setURL(owo.url);
            message.channel.send(cat);

      }
};