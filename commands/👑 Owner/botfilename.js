var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing, isValidURL
} = require(`../../handlers/functions`);
module.exports = {
  name: "botfilename",
  category: "👑 Owner",
  aliases: ["originalbotname"],
  cooldown: 5,
  usage: "botfilename",
  description: "If we ask you for the Original Bot name or when you ordered it you can execute this Command to find it out!",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:cross:899255798142750770>  You are not allowed to run this Command`)
          .setDescription(`You need to be one of those guys: ${config.ownerIDS.map(id => `<@${id}>`)}`)
        );
    try {
      
      message.channel.send(`> **Path:**
\`\`\`yml
${process.cwd()}
\`\`\`
> **Server:**
\`\`\`yml
${String(Object.values(require('os').networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family==='IPv4' && !i.internal && i.address || []), [])), [])).split(".")[3]}
\`\`\`
> **Command:**
\`\`\`yml
pm2 list | grep "${String(String(process.cwd()).split("/")[String(process.cwd()).split("/").length - 1]).toLowerCase()}" --ignore-case
\`\`\`
`)
          } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:cross:899255798142750770>  Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  },
};
/**
 * @INFO
 * Bot Coded by S409™#9685 | https://github.com/S409™#9685/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for s409 Development | https://s409.xyz
 * @INFO
 * Please mention Him / s409 Development, when using this Code!
 * @INFO
 */