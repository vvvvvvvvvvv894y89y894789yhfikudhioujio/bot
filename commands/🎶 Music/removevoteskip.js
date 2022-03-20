const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `removevoteskip`,
  category: `🎶 Music`,
  aliases: [`rvs`, `removeskip`, `removevs`, `votestop`, `stopvote`],
  description: `Removes your Vote of the VoteSkip!`,
  usage: `removevoteskip`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "MUSIC")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:cross:899255798142750770>  THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
    try{
      //Check if there is a Dj Setup
      if (client.settings.get(message.guild.id, `djroles`).toString() !== ``) {
        let channelmembersize = channel.members.size;
        let voteamount = 0;
        if (channelmembersize <= 3) voteamount = 1;

        voteamount = Math.ceil(channelmembersize / 3);

        if (player.get(`vote-${message.author.id}`)) {
          player.set(`vote-${message.author.id}`, false)
          player.set(`votes`, String(Number(player.get(`votes`)) - 1));
          return message.channel.send(new MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:tick:899255869185855529> Removed your Vote!`)
            .setDescription(`There are now: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes`)
          );
        } else {
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:cross:899255798142750770>  You havn't voted yet!!`)
            .setDescription(`There are: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes`)
          );
        }
      } else
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:cross:899255798142750770>  Cannot remove your Vote!`)
          .setDescription(`Because ther is no DJ-Role Setup created yet, create it by typing \`${prefix}adddj @DJ-Setup\``)
        );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:cross:899255798142750770>  An error occurred`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
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
