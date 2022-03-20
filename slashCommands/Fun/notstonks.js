const Discord = require("discord.js");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
const canvacord = require("canvacord");
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const request = require("request");
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: "notstonks",
  aliases: [""],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "notstonks <TEXT>",
  type: "text",
  options: [
    { "String": { name: "text", description: "What should I send? [ +n+ = Newline ]", required: true } }, //to use in the code: interacton.getString("title")
  ],
  run: async (client, interaction, cmduser, es, ls, prefix, player, message) => {

    if (!client.settings.get(message.guild.id, "FUN")) {
      return interaction?.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.getFooter(es))
          .setTitle(client.la[ls].common.disabled.title)
          .setDescription(require(`${process.cwd()}/handlers/functions`).handlemsg(client.la[ls].common.disabled.description, { prefix: prefix }))
        ], ephemeral: true
      });
    }
    await interaction?.deferReply({ephemeral: false});
    //get the additional text
    const text = interaction?.options.getString("text"); //same as in StringChoices //RETURNS STRING 
    //If no text added, return error
    if (!text) return interaction?.editReply({
      ephemeral: false,
      embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.getFooter(es))
        .setTitle(eval(client.la[ls]["cmds"]["fun"]["notstonks"]["variable2"]))
        .setDescription(eval(client.la[ls]["cmds"]["fun"]["notstonks"]["variable3"]))
      ]
    }).catch(() => {})

    //get the memer image
    client.memer.notstonks(text).then(image => {
      //make an attachment
      var attachment = new MessageAttachment(image, "notstonks.png");
      //send new Message
      interaction?.editReply({
        embeds: [new MessageEmbed()
          .setColor(es.color)
          .setFooter(client.getFooter(es))
          .setAuthor(`Meme for: ${message.author.tag}`, message.author.displayAvatarURL())
          .setImage("attachment://notstonks.png")
        ], files: [attachment], ephemeral: false
      }).catch(() => {})
    })

  }
}
/**
 * @INFO
 * Bot Coded by S409™#0001 | https://discord.gg/hx2wg4HfQS
 * @INFO
 * Work for Zink Development | https://s409.xyz
 * @INFO
 * Please mention him / Zink Development, when using this Code!
 * @INFO
 */
