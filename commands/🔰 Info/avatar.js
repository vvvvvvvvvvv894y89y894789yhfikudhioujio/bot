const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
module.exports = {
  name: "avatar",
  aliases: ["av"],
  category: "🔰 Info",
  description: "Get the Avatar of an user",
  usage: "avatar [@USER] [global/guild]",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {

      var user;
      try{
        if(args[1] && args[1].toLowerCase() == "global"){
          args.pop()
          user = await GetGlobalUser(message, args)
        }else {
          user = await GetUser(message, args)
        }
      }catch (e){
        return message.reply(e)
      }
      message.channel.send(new Discord.MessageEmbed()
        .setAuthor(`Avatar from: ${user.tag}`, user.displayAvatarURL({dynamic: true}), "https://discord.gg/ve7z9K4QXV")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .addField("<:arrow:899324566927732746> PNG",`[\`LINK\`](${user.displayAvatarURL({format: "png"})})`, true)
        .addField("<:arrow:899324566927732746> JPEG",`[\`LINK\`](${user.displayAvatarURL({format: "jpg"})})`, true)
        .addField("<:arrow:899324566927732746> WEBP",`[\`LINK\`](${user.displayAvatarURL({format: "webp"})})`, true)
        .setURL(user.displayAvatarURL({
          dynamic: true
        }))
        .setFooter(es.footertext, es.footericon)
        .setImage(user.displayAvatarURL({
          dynamic: true, size: 512,
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
