const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../botconfig/config.json")
module.exports = {
  name: "dog",
  category: "🔎 Search",
  usage: "dog",
  description: "Search Any Thing On Dog.",
  run: async (client, message, args, cmduser, text, prefix) => {
           let owo = (await neko.sfw.woof());

            const dog = new Discord.MessageEmbed()
                  .setTitle("Random dog Image")
                  .setImage(owo.url)
                  .setColor("#00d7ff")
                  .setFooter(client.user.username, "https://images-ext-1.discordapp.net/external/VVGTZQjNRaziH5kxOme_OaGFTmF13tsdEhcPrhs_2ZU/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/882819636763189278/d3504eb09b2f47359eb408540db6fabf.webp")
                  .setURL(owo.url);
            message.channel.send(dog);

      }
};