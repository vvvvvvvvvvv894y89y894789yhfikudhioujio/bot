const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `bassboost`,
  category: `👀 Filter`,
  aliases: [`bb`],
  description: `Changes the Bass gain`,
  usage: `bassboost <none/low/medium/high>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    ee = client.settings.get(message.guild.id, "embed")
    try {
      let level = `none`;
      if (!args.length || (!client.bassboost[args[0].toLowerCase()] && args[0].toLowerCase() != `none`))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`<:cross:899255798142750770>  Bass boost level must be one of the following: \`none\`, \`low\`, \`medium\`, \`high\`, \`earrape\``)
          .setDescription(`Usage: \`${prefix}bassboost <Level>\`\n\nExample: \`${prefix}bassboost low\``)
        );
      level = args[0].toLowerCase();
      switch (level) {
        case `none`:
          player.setEQ(client.bassboost.none);
          player.node.send({
            op: "filters",
            guildId: message.guild.id,
            equalizer: player.bands.map((gain, index) => {
                var Obj = {
                  "band": 0,
                  "gain": 0,
                };
                Obj.band = Number(index);
                Obj.gain = Number(gain)
                return Obj;
              }),
            timescale: {
                  "speed": 1.0,
                  "pitch": 1.0,
                  "rate": 1.0
              },
          });
          break;
        case `low`:
          player.setEQ(client.bassboost.low);
          player.node.send({
            op: "filters",
            guildId: message.guild.id,
            equalizer: player.bands.map((gain, index) => {
                var Obj = {
                  "band": 0,
                  "gain": 0,
                };
                Obj.band = Number(index);
                Obj.gain = Number(gain)
                return Obj;
              }),
          });
          break;
        case `medium`:
          player.setEQ(client.bassboost.medium);
          player.node.send({
            op: "filters",
            guildId: message.guild.id,
            equalizer: player.bands.map((gain, index) => {
                var Obj = {
                  "band": 0,
                  "gain": 0,
                };
                Obj.band = Number(index);
                Obj.gain = Number(gain)
                return Obj;
              }),
          });
          break;
        case `high`:
          player.setEQ(client.bassboost.high);
          player.node.send({
            op: "filters",
            guildId: message.guild.id,
            equalizer: player.bands.map((gain, index) => {
                var Obj = {
                  "band": 0,
                  "gain": 0,
                };
                Obj.band = Number(index);
                Obj.gain = Number(gain)
                return Obj;
              }),
          });
        case `earrape`:
          player.setEQ(client.bassboost.high);
          player.node.send({
            op: "filters",
            guildId: message.guild.id,
            equalizer: player.bands.map((gain, index) => {
                var Obj = {
                  "band": 0,
                  "gain": 0,
                };
                Obj.band = Number(index);
                Obj.gain = Number(gain)
                return Obj;
              }),
          });
          break;
      }
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<:tick:899255869185855529> Bassboost set the to \`${level}\``)
        .setDescription(`Note: *It might take up to 5 seconds until you hear the new Equalizer*`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<:cross:899255798142750770>  An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
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
