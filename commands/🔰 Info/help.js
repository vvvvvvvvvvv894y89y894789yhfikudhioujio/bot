const Discord = require('discord.js')
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  duration
} = require("../../handlers/functions")
const { MessageMenuOption, MessageMenu } = require("discord-buttons")
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    let settings = client.settings.get(message.guild.id)
    try {
      if (args[0]) {
        const embed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if(args[0].toLowerCase().includes("cust")){
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc


          const embed = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`🦾 **Custom Commands [${cuc[0].includes("NO") ? 0 : items.length}]**`)
            .setDescription(items.join(", "))
            .setFooter(`No custom information for the Custom Commands ;(`, client.user.displayAvatarURL());
          
          message.channel.send(embed)
          return;
        }var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.channel.send(embed.setColor(es.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`));
        } else if (!cmd && cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const embed = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`MENU 🔰 **${category.toUpperCase()} [${items.length}]**`)
            .setFooter(`To see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.setDescription(`**${category.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n\n**Usage:**\n> \`${cmd.usage}\``);
            } catch {}
          } else {
            embed.setDescription(`${items.join(", ")}`)
          }
          return message.channel.send(embed)
        }
        if (cmd.name) embed.addField("**<:image_20220118_204407removebgpre:933099580529197078>  Command name**", `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`<:image_20220118_204407removebgpre:933099580529197078>  Detailed Information about: \`${cmd.name}\``);
        if (cmd.description) embed.addField("**<:image_20220118_204407removebgpre:933099580529197078>  Description**", `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases) try {
          embed.addField("**<:image_20220118_204407removebgpre:933099580529197078>  Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch {}
        if (cmd.cooldown) embed.addField("**<:image_20220118_204407removebgpre:933099580529197078>  Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField("**<:image_20220118_204407removebgpre:933099580529197078>  Cooldown**", `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField("**<:image_20220118_204407removebgpre:933099580529197078>  Usage**", `\`\`\`${config.prefix}${cmd.usage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
        }
        if (cmd.useage) {
          embed.addField("**<:image_20220118_204407removebgpre:933099580529197078>  Useage**", `\`\`\`${config.prefix}${cmd.useage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
        }
        return message.channel.send(embed);
      }

        let option1 = new MessageMenuOption()
        .setLabel("​Information")
        .setValue("​Information")
        .setDescription("🔰 ​Information Commands")
        .setDefault()
        .setEmoji("🔰")
        
        let option2 = new MessageMenuOption()
            .setLabel("Music Related")
            .setValue("Music Related")
            .setDescription("Music Commands")
            .setDefault()
            .setEmoji("891240754993844244")
        let setting = new MessageMenuOption()
            .setLabel("Settings & 👑 Owner")
            .setValue("Settings & 👑 Owner")
            .setDescription("⚙ Settings & 👑 Owner Commands")
            .setDefault()
            .setEmoji("892078131765190686")
        let rank = new MessageMenuOption()
            .setLabel("Voice & 📈 Ranking")
            .setValue("Voice & 📈 Ranking")
            .setDescription("🎤 Voice & 📈 Ranking Commands")
            .setDefault()
            .setEmoji("🎤")
        let game = new MessageMenuOption()
            .setLabel("Mini Games & 🕹️ Fun")
            .setValue("Mini Games & 🕹️ Fun")
            .setDescription("🎮 Mini Games & 🕹️ Fun Commands")
            .setDefault()
            .setEmoji("864352938134994994")
        let admin = new MessageMenuOption()
           .setLabel("Administration & 💪 Setup")
           .setValue("Administration & 💪 Setup")
           .setDescription("🚫 Administration & 💪 Setup Commands")
           .setEmoji("892090597433823323")

        let nsfw = new MessageMenuOption()
           .setLabel("NSFW​")
           .setValue("NSFW​")
           .setDescription("🔞 NSFW​ Commands")
           .setEmoji("🔞")
        
          let custom = new MessageMenuOption()
           .setLabel("Custom Commands")
           .setValue("Custom Commands")
           .setDescription("🦾 Custom Commands")
           .setEmoji("🦾")
          
          let mine = new MessageMenuOption()
            .setLabel("Minecraft")
           .setValue("Minecraft")
           .setDescription("🤞 Minecraft Commands")
           .setEmoji("878601446529040444")

                    
          let search = new MessageMenuOption()
            .setLabel("Search")
           .setValue("Search")
           .setDescription("🔎 Search Commands")
           .setEmoji("864351720796061706")

        let selection = new MessageMenu()
            .setID("Selection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Commands")
            .addOption(option1)
            .addOption(option2)
            .addOption(setting)
            .addOption(rank)
            .addOption(game)
            .addOption(admin)
            .addOption(nsfw)
            .addOption(custom)
            .addOption(mine)
            .addOption(search)


        let embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
.setColor(es.color)
.setFooter("XeroClanBot | Made by S409™#9685", client.user.displayAvatarURL())
.setTitle(`Information about the  <:d3504eb09b2f47359eb408540db6fabf:910258058523988089> bot`)
.addField("<:tick:899255869185855529> **__My Features__**",
`>>> **58+ Systems**, like: <:twitter:920736055982977044> **Twitter-** & <:image_20220118_205304removebgpre:933101760371908650> **Youtube-Auto-Poster** 
**Application-**, Ticket-, **Welcome-Images-** and Reaction Role-, ... Systems
:notes: An advanced :question: **Music System** with **Audio Filtering**
:video_game: Many **Minigames** and :joystick: **Fun** Commands (150+)
:no_entry_sign: **Administration** and **Auto-Moderation** and way much more!`)
        .addField(":question: **__How do you use me?__**",
`>>> \`${prefix}setup\` and react with the Emoji for the right action,
but you can also do \`${prefix}setup-SYSTEM\` e.g. \`${prefix}setup-welcome\``)
.addField("<:onlineremovebgpreview:933478832294469683> **__STATS:__**",                           
`>>> <:download__1_removebgpreview:933101251762192394>●**Total Users:** \`${client.users.cache.size} Users\`
<:download__1_removebgpreview:933101251762192394>●**Total Server:** \`${client.guilds.cache.size} Servers\`
<:download__1_removebgpreview:933101251762192394>●**Total Guilds:** \`${client.guilds.cache.size} Guilds\`
<:download__1_removebgpreview:933101251762192394>●**Total Commands:** \`${client.commands.map(a=>a).length} Commands\`
<:download__1_removebgpreview:933101251762192394>●**Uptime:** \`${duration(client.uptime).map(i=> `${i}`).join(", ")}\``)

.addField("<:image_20220118_205010removebgpre:933101029287931914> **Ping**", `>>>  <:image_20220118_205010removebgpre:933101029287931914> :\`${Math.round(Date.now() - message.createdTimestamp)}ms\`
<:image_20220118_204625removebgpre:933100266310492193> Api Latency: \`${client.ws.ping}ms\``)

        
        .addField("<:image_20220118_204407removebgpre:933099580529197078> **__Developer__**",
 `>>> \` • S409™#9685
\``)
.setImage("https://cdn.discordapp.com/attachments/898700576286732368/933096206647840808/standard_1.gif")

        
let embed0 = new Discord.MessageEmbed()
.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
.setTitle(`🔰 Information Commands 🔰`)
.setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🔰 Info").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
.addField(settings.ECONOMY ? "💸 **Economy** | <:tick:899255869185855529> ENABLED" : "💸 **Economy** | <:cross:899255798142750770> DISABLED",`> ${client.commands.filter((cmd) => cmd.category === "💸 Economy").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
.addField(settings.SCHOOL ? "🏫 **School** | <:tick:899255869185855529> ENABLED" : "🏫 **School** | <:cross:899255798142750770> DISABLED", `> ${client.commands.filter((cmd) => cmd.category === "🏫 School Commands").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
.setFooter(`XeroClanBot | Made by S409™#9685\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

          let embed1 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🎶 Music Related Commands :notes:`)
            .setDescription(`🎶 **Music**${settings.MUSIC ? " | <:tick:899255869185855529> ENABLED" : " | <:cross:899255798142750770> DISABLED"}\n> ${client.commands.filter((cmd) => cmd.category === "🎶 Music").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MUSIC ? "👀 **Filter** | <:tick:899255869185855529> ENABLED" : "👀 **Filter** | <:cross:899255798142750770> DISABLED", `>>> ${client.commands.filter((cmd) => cmd.category === "👀 Filter").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MUSIC ? "⚜️ **Custom Queue(s)** | <:tick:899255869185855529> ENABLED" : "⚜️ **Custom Queue(s)** | <:cross:899255798142750770> DISABLED", `${client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").map((cmd) => `\`${cmd.name}\``).join(", ")}`.substr(0, 1024))
            .setFooter(`XeroClanBot | Made by: S409™#9685\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

              let embed2 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`⚙️ Settings & Owner Commands 👑`)
            .setDescription(`⚙️ **Settings**\n> ${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField("👑 **Owner**", `>>> ${client.commands.filter((cmd) => cmd.category === "👑 Owner").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField("⌨️ **Programming**", `${client.commands.filter((cmd) => cmd.category === "⌨️ Programming").map((cmd) => `\`${cmd.name}\``).join(", ")}`.substr(0, 1024))
            .setFooter(`XeroClanBot | Made by S409™#96859\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

           let embed3 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🎤 Voice & Ranking Commands 📈`)
            .setDescription(`🎤 **Voice**${settings.VOICE ? " | <:tick:899255869185855529> ENABLED" : " | <:cross:899255798142750770> DISABLED"}\n> ${client.commands.filter((cmd) => cmd.category === "🎤 Voice").map((cmd) => `**Command:**\n>>> \`${cmd.name}\`\n\n**Usage:**\n ${cmd.usage}`)}`)
            .addField("📈 **Ranking**", `>>> ${client.commands.filter((cmd) => cmd.category === "📈 Ranking").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.SOUNDBOARD ? "🔊 **Soundboard** | <:tick:899255869185855529> ENABLED" : "🔊 **Soundboard** | <:cross:899255798142750770> DISABLED", `${client.commands.filter((cmd) => cmd.category === "🔊 Soundboard").map((cmd) => `\`${cmd.name}\``).join(", ")}`.substr(0, 1024))
            .setFooter(`XeroClanBot | Made by S409™#9685\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
            
              let embed4 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🎮 Mini Games & Fun Commands 🕹️`)
            .setDescription(`🕹️ **Fun**${settings.FUN ? " | <:tick:899255869185855529> ENABLED" : " | <:cross:899255798142750770> DISABLED"}\n> ${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MINIGAMES ? "🎮 **Mini Games** | <:tick:899255869185855529> ENABLED" : "🎮 **Mini Games**| <:cross:899255798142750770> DISABLED", `> ${client.commands.filter((cmd) => cmd.category === "🎮 MiniGames").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`XeroClanBot | Made by S409™#9685\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

            let embed5 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🚫 Administration & Setup Commands 💪`)
            .setDescription(`🚫 **Admin**\n> ${client.commands.filter((cmd) => cmd.category === "🚫 Administration").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField("💪 **Setup**", `>>> ${client.commands.filter((cmd) => cmd.category === "💪 Setup").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`XeroClanBot | Made by S409™#96859\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

            let embed6 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(settings.NSFW ? "🔞 NSFW Commands 🔞 | <:tick:899255869185855529> ENABLED" : "🔞 NSFW Commands 🔞 | <:cross:899255798142750770> DISABLED")
            .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🔞 NSFW").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`XeroClanBot | Made by S409™#9685\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
          
          let embed7 = new Discord.MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle("🦾 Custom Commands")
          .setFooter(`XeroClanBot | Made by S409™#9685\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `-setup-customcommands`"]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc
            embed7.setTitle(`🦾 **Custom Commands [${cuc[0].includes("NO") ? 0 : items.length}]**`)
            embed7.setDescription(items.join(", "))
        
        let embed8 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🤞 Mincraft`)
            .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🤞 Mincraft").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`XeroClanBot | Made by S409™#9685\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

        let embed9 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🔎 Search`)
            .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🔎 Search").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`XeroClanBot | Made by S409™#9685\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())


        let menumsg = await message.channel.send(embed, selection)

        function menuselection(menu) {
            switch(menu.values[0]) {
                case "​Information": 
                    menu.reply.send(embed0 , true)
                break;
                case "Music Related": 
                    menu.reply.send(embed1, true)
                break;
                case "Settings & 👑 Owner": 
                    menu.reply.send(embed2, true)
                break;
                case "Voice & 📈 Ranking": 
                    menu.reply.send(embed3, true)
                break;
                case "Mini Games & 🕹️ Fun":
                     menu.reply.send(embed4 ,true)
                break;
                case "Administration & 💪 Setup":
                     menu.reply.send(embed5, true)
                break;
                    case "NSFW​":
                     menu.reply.send(embed6, true)
                break;
                    case "Custom Commands":
                     menu.reply.send(embed7, true)
                break;
                    case "Minecraft":
                     menu.reply.send(embed8, true)
                break;
                    case "Search":
                     menu.reply.send(embed9, true)
                break;


            }
        }

        client.on("clickMenu", (menu) => {
            if(menu.message.id == menumsg.id) {
                if(menu.clicker.user.id == message.author.id) menuselection(menu)
                else menu.reply.send(":x: you are not allowed to pick something", true)
            }
        })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:cross:899255798142750770> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}