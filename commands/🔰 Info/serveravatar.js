const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json")
var ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
const moment = require("moment")
module.exports = {
  name: "serveravatar",
  aliases: ["savatar"],
  category: "🔰 Info",
  description: "Shows the ServerAvatar",
  usage: "serveravatar",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      message.channel.send(new Discord.MessageEmbed()
      .setAuthor(`Avatar from: ${message.guild.name}`, message.guild.iconURL({dynamic: true}), "https://discord.gg/G99nPWMBYe")
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .addField("<a:arrow:865655067348303943> PNG",`[\`LINK\`](${message.guild.iconURL({format: "png"})})`, true)
      .addField("<a:arrow:865655067348303943> JPEG",`[\`LINK\`](${message.guild.iconURL({format: "jpg"})})`, true)
      .addField("<a:arrow:865655067348303943> WEBP",`[\`LINK\`](${message.guild.iconURL({format: "webp"})})`, true)
      .setURL(message.guild.iconURL({
        dynamic: true
      }))
      .setFooter(es.footertext, es.footericon)
      .setImage(message.guild.iconURL({
        dynamic: true, size: 256,
      }))
    );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:cross:899255798142750770>  ERROR | An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}
/**
 * @INFO
 * Bot Coded by S409™#9685 | https://github.com/S409™#9685/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for s409 Development | https://s409.xyz
 * @INFO
 * Please mention Him / s409 Development, when using this Code!
 * @INFO
 */
