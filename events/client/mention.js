const prefixModel = require("../../database/guildData/prefix");
const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js") 

module.exports = async (message, client) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
    return;

  const prefixData = await prefixModel.findOne({
      GuildID: message.guild.id,
    }).catch(err=>console.log(err))
  
    if (prefixData) {
      var PREFIX = prefixData.Prefix
    } else if (!prefixData) {
      PREFIX = "+"
    }
    client.prefix = PREFIX;

  // mentioned bot
  
   const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {

    let embed = new MessageEmbed()
        .setTitle(`${client.user.username} is Here!`)
        .setDescription(`Hey **${message.author.username},**Bot Prefix: \`,\` Forgot My Prefix? you can always mention me as prefix
        Invite Link: [Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)
        :question: Still need help? [Click Here](https://discord.gg/yK7D6YfYbp) to join server
        `)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("#006732")
        .setFooter(`Thanks for using me`)
    const row = new MessageActionRow() 
    .addComponents(
      new MessageButton()
    .setStyle("LINK")
.setLabel("Invite Me")
.setEmoji("906785808940425267")
    .setURL("https://discord.gg/yK7D6YfYbp"),
    new MessageButton()
    .setStyle("LINK")
.setLabel("Support Server")
.setEmoji("906786359925170176")
    .setURL("https://discord.gg/yK7D6YfYbp")
      )
      message.channel.send({embeds: [embed], components: [row]})
    
      }

      }
