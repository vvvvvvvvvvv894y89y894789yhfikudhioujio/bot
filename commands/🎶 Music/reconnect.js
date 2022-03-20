const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const radios = require(`../../botconfig/radiostations.json`);
const playermanager = require(`../../handlers/playermanager`);
const { stations } = require(`../../handlers/functions`);
module.exports = {
    name: `reconnect`,
    category: `🎶 Music`,
    aliases: [`rejoin`],
    description: `Rejoins the Setupped Channel`,
    usage: `reconnect`,
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed")
    try{
      
        try{
            let channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `channel`))
            if(!channel) return message.reply(`No setup done yet? Try it with \`${prefix}setup\``);
            //get the player instance
            const player = client.manager.players.get(message.guild.id);
            //if there is a player and they are not in the same channel, return Error
            if (player && player.state === "CONNECTED") await player.destroy();
            playermanager(client, message, Array(client.settings.get(message.guild.id, `song`)), `song:radioraw`, channel, message.guild);
        }catch{
            return message.reply(`No setup done yet? Try it with \`${prefix}setup\``)
        }
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
