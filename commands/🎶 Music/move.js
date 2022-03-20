const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  format,
  arrayMove
} = require(`../../handlers/functions`);
module.exports = {
  name: `move`,
  category: `🎶 Music`,
  aliases: [`mv`],
  description: `Shows the Queue`,
  usage: `move <from> <to>`,
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
      //if no FROM args return error
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`${emoji.msg.ERROR} | Wrong Command Usage!`)
          .setDescription(`Usage: \`${prefix}move <from> <to>\`\nExample: \`${prefix}move ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 } 1\``)
        );
      //If no TO args return error
      if (!args[1])
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`${emoji.msg.ERROR} | Wrong Command Usage!`)
          .setDescription(`Usage: \`${prefix}move <from> <to>\`\nExample: \`${prefix}move ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 } 1\``));
      //if its not a number or too big / too small return error
      if (isNaN(args[0]) || args[0] <= 1 || args[0] > player.queue.length)
        return message.channel.send(
          new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`${emoji.msg.ERROR} | Error Your Input must be a Number greater then \`1\` and smaller then \`${player.queue.length}\``)
        );
      //get the new Song
      let song = player.queue[player.queue.length - 1];
      //move the Song to the first position using my selfmade Function and save it on an array
      let QueueArray = arrayMove(player.queue, player.queue.length - 1, 0);
      //clear teh Queue
      player.queue.clear();
      //now add every old song again
      for (const track of QueueArray)
        player.queue.add(track);
      //send informational message
      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:tick:899255869185855529> Mmoved the Song in the Queue from Position \`${args[0]}\` to Position: \`${args[1]}\``)
        .setThumbnail(song.displayThumbnail())
        .setDescription(`[${song.title}](${song.uri}) - \`${format(song.duration)}\` - requested by **${song.requester.tag}**`)
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
