const { Client, Interaction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["inv"],
  description: "Get Links To Invite Me :D",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
   run: async (client, interaction, args) => {
    try {
      const embed = new MessageEmbed().setColor("WHITE");

      
      const row = new MessageActionRow().addComponents(
       
        new MessageButton().setLabel("Invite Me!").setURL(" https://discord.gg/zp8nTQqD9h").setStyle("LINK").setEmoji("906785808940425267")                                                                        
                                                                                                            
                                                                                                          
      ,
        new MessageButton()
      .setStyle("LINK")
      .setEmoji("895292197828718592")
.setLabel("SUPPORT SERVER")
      .setURL("https://dsc.gg/lunarteam"),
      )

      embed.setDescription(`<a:TCC_IconNote:887805199547269171> **MOONLIGHT is one of the only free all in one bots that has many features like tickets, reaction roles, uptimer and buttons while keeping the minimalistic feel and look that every bot user loves.**`);
      embed.setImage("https://media.discordapp.net/attachments/899642431040028672/904698477261512755/standard.gif")
      await interaction.reply({ embeds: [embed], components: [row] });
    } catch (err) {
      console.log("Something Went Wrong => ", err);
    }
  },
};