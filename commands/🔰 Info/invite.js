const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.gg/hWb3TFtheW")
      let button_invite = new MessageButton().setStyle('url').setLabel('Invite this Bot').setURL(`https://discordapp.com/oauth2/authorize?client_id=882819636763189278&permissions=2146959359&scope=bot%20applications.commands`)
      //array of all buttons
      const allbuttons = [button_support_dc, button_invite]
       message.channel.send({
         embed: new MessageEmbed()
          .setColor(ee.color)
          .setTitle("Thanks for inviting XeroClanBot")
          .addField(`XeroClanBot Powered by S409™#9685`, `**[Invite Public Bot](https://discordapp.com/oauth2/authorize?client_id=882819636763189278&permissions=2146959359&scope=bot%20applications.commands)  •  [Support Server](https://discord.gg/hWb3TFtheW)
          **\n\n[**Invite** **${client.user.username}**](https://discordapp.com/oauth2/authorize?client_id=882819636763189278&permissions=2146959359&scope=bot%20applications.commands)`)
          .setImage("https://cdn.discordapp.com/attachments/898700576286732368/933096206647840808/standard_1.gif")
          .setFooter("XeroClanBot | powered by S409™#9685", "https://images-ext-1.discordapp.net/external/VVGTZQjNRaziH5kxOme_OaGFTmF13tsdEhcPrhs_2ZU/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/882819636763189278/d3504eb09b2f47359eb408540db6fabf.webp"),
        buttons: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}