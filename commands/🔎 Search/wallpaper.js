const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
module.exports = {
  name: "wallpaper",
  category: "🔎 Search",
  usage: "wallpaper",
  description: "Search Any Thing On wallpaper.",
  run: async (client, message, args, cmduser, text, prefix) => {
        let owo = (await neko.sfw.wallpaper());

    const wallpaper = new Discord.MessageEmbed()
      .setTitle("Random Wallpaper")
      .setImage(owo.url)
      .setColor("RANDOM")
      .setFooter(client.user.username, "https://images-ext-1.discordapp.net/external/VVGTZQjNRaziH5kxOme_OaGFTmF13tsdEhcPrhs_2ZU/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/882819636763189278/d3504eb09b2f47359eb408540db6fabf.webp")
      .setURL(owo.url);
    message.channel.send(wallpaper);
  }
};