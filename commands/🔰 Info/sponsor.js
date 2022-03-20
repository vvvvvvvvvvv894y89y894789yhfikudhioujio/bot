const {MessageEmbed} =require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`)
var ee = require(`${process.cwd()}/botconfig/embed.json`)
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { swap_pages2	 } = require(`${process.cwd()}/handlers/functions`);
module.exports = {
	name: "sponsor",
	category: "🔰 Info",
	aliases: ["sponsors"],
	description: "Shows the sponsor of this BoT",
	usage: "sponsor",
	type: "bot",
	run: async (client, message, args, cmduser, text, prefix) => {
		let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
		
	try{
			let embed1 = new MessageEmbed()
		    .setColor(es.color)
		    .setTitle(eval(client.la[ls]["cmds"]["info"]["sponsor"]["variable1"]))
		    .setURL("http://s409.xyz/?utm_source=bot&utm_medium=cpc&utm_id=Zink")
		    .setDescription(`
Third Sponsor of This Bot is:
**-HOST** THE BEST HOSTER
<:arrow:832598861813776394> s409.xyz is sponsoring them with some free / cheaper Hosting Methods,
<:arrow:832598861813776394> Thanks to them, we are able to host our Website, Bots and GAME SERVERS
<:arrow:832598861813776394> Our suggestion is, if you want to host Bots / Games / Websites, then go to [s409.xyz](http://s409.xyz/?utm_source=bot&utm_medium=cpc&utm_id=Zink)

**What they are offering:**
<:arrow:832598861813776394> **>>** Minecraft Hosting, CounterStrike: Global Offensive, Garry's Mod, ARK, ARMA 3, ...
<:arrow:832598861813776394> **>>** Cheap and fast Domains
<:arrow:832598861813776394> **>>** WEBHOSTING
<:arrow:832598861813776394> **>>** TEAMSPEAK SERVERS
<:arrow:832598861813776394> **>>** Linux & Windows Root Servers

[**Discord Server:**](https://discord.s409.xyz)
[**Website:**](http://s409.xyz/?utm_source=bot&utm_medium=cpc&utm_id=Zink)
[**__SPONSOR LINK!__**](https://s409.xyz/img/paysafecard.png)
`)
		    .setImage("https://cdn.s409.xyz/img/logo/_white.png")
		    .setFooter("-HOST",  "https://imgur.com/jXyDEyb?.png")
		
		let embed2 = new MessageEmbed()
			.setColor(es.color)
			.setTimestamp()
			.setFooter("Bittmax.de | Code  'x10' == -5%",  'https://imgur.com/UZo3emk.png')
			.setImage("https://cdn.discordapp.com/attachments/807985610265460766/822982640000172062/asdasdasdasdasd.png")
			.setTitle(eval(client.la[ls]["cmds"]["info"]["sponsor"]["variable4"]))
			.setURL("https://bittmax.de")
			.setDescription(`
<:arrow:832598861813776394> Bittmax is providing us, like -HOST with free Discord Bot-Hosting technologies

<:arrow:832598861813776394> If you use the code: **\`x10\`** their, then you'll get at least 5% off everything!

<:arrow:832598861813776394> Check out their [Website](https://bittmax.de) and their [Discord](https://discord.gg/GgjJZCyYKD) to get your own Bot too!`);
			swap_pages2(client, message, [embed1, embed2])
		} catch (e) {
        console.log(String(e.stack).grey.bgRed)
		return message.reply({embeds: [new MessageEmbed()
		  .setColor(es.wrongcolor)
		  .setFooter(client.getFooter(es))
		  .setTitle(client.la[ls].common.erroroccur)
		  .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
		]});
    }
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
