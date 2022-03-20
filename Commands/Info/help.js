const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require("discord.js")

const config = require("../../config")
module.exports = {
  name: "help",

  run: async (client, message, args) => {
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('Nothing selected')

          .addOptions([
            {
              label: 'Main Menu',
              description: 'Shows the main menu',
              emoji: "906785808940425267",
              value: '0',
            },
            {
              label: 'Config Commands',
              description: 'Shows all the config commands',
              emoji: "906786750494564353",
              value: '1',
            },

            {
              label: 'Birthday Commands',
              description: 'Shows all the birthday commands',
              emoji: "🎂",
              value: '2',
            },
            {
              label: 'Economy Commands',
              description: 'Shows all the economy commands',
              emoji: "🪙",
              value: '3',
            },
            {
              label: 'Music Commands',
              description: 'Shows all the music commands',
              emoji: "936546598379487242",
              value: '4',
            },

            {
              label: 'Fun Commands',
              description: 'Shows all the fun commands',
              emoji: "938771037213057045",
              value: '5',
            },
            {
              label: 'Games Commands',
              description: 'Shows all the game commands',
              emoji: "906790704204886047",
              value: '6',
            },
            {
              label: 'Images Commands',
              description: 'Shows all the image commands',
              emoji: "937615330044420166",
              value: '7',
            },

            {
              label: 'Information Commands',
              description: 'Shows all the information commands',
              emoji: "936546405584089108",
              value: '9',
            },
            {
              label: 'Moderation Commands',
              description: 'Shows all the moderation commands',
              emoji: "932487033434296430",
              value: '10',
            },
            {
              label: 'Utility Commands',
              description: 'Shows all the utility commands',
              emoji: "906790955582124112",
              value: '11',
            },
          ]),
      );
    const row2 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle("LINK")
          .setLabel("Invite Me")
          .setEmoji("906785808940425267")
          .setURL("https://discord.gg/zp8nTQqD9h"),
        new MessageButton()
          .setStyle("LINK")
          .setLabel("Support Server")
          .setEmoji("906785808940425267")
          .setURL("https://discord.gg/zp8nTQqD9h")
      )

    const embed = new MessageEmbed()
      .setTitle("**HELP MENU**")
      .setDescription(`Pls select a category to see more commands.\n\n> <a:uptimer:906786775589077034> \`\Prefix\`\: ${config.DEFAULT_PREFIX}\n> <a:loading_:906786750494564353> \`\Total Commands\`\: ${client.commands.size}\n> <:join:906786246767038515> \`\Total Servers\`\: ${client.guilds.cache.size} `)
      .setImage("https://cdn.discordapp.com/attachments/905075947282268187/906877143173189692/Untitled_Photo.png")
      .setColor("#f4c2c2")


    let sendmsg = message.channel.send({ embeds: [embed], components: [row, row2] })

    let embed1 = new MessageEmbed()
      .setColor('#FFFFFF')
      .setTitle('**HELP MENU**')
      .addFields(
        { name: "**CONFIG COMMANDS**", value: `\`\ANTILINK\`\ \`\AUTOROLE\`\ \`\EMBED\`\ \`\PREFIX\`\ \`\SETUP\`\ ` })
      .setImage("https://cdn.discordapp.com/attachments/905075947282268187/906877143173189692/Untitled_Photo.png")
      .setColor("#f4c2c2")
      .setFooter('Page 1')

    let embed2 = new MessageEmbed()
      .setTitle('**Help Menu**')
      .setColor('#FFFFFF')
      .addFields(
        { name: "**BIRTHDAY COMMANDS**", value: `\`\SET-B\`\ \`\CHECK-B\`\ ` })
      .setColor("#f4c2c2")
      .setImage("https://cdn.discordapp.com/attachments/905075947282268187/906877143173189692/Untitled_Photo.png")
      .setFooter('Page 2')

    let embed3 = new MessageEmbed()

      .setTitle('**Help Menu**')
      .setColor('#FFFFFF')
      .addFields(
        { name: "**ECONOMY COMMANDS**", value: "`balance` `deposit` `crime` `search` `gamble-double` `withdraw`" })
      .setColor("#f4c2c2")
      .setImage("https://cdn.discordapp.com/attachments/905075947282268187/906877143173189692/Untitled_Photo.png")
      .setFooter('Page 3')



    let embed4 = new MessageEmbed()
      .setTitle('**Help Menu**')
      .setColor('#FFFFFF')
      .addFields(
        { name: "**MUSIC COMMANDS**", value: "`clearqueue`, `filter`, `filter list`, `info`, `jump`, `loop`, `lyrics`, `move`, `mute`, `pause`, `play`, `previoustrack`, `queue`, `remove`, `resume`, `unmute`, `volume`, `youtube`\n\n```Note: Music commands work only with slash commands!\nBe sure to use music before each command!```" })
      .setImage("https://cdn.discordapp.com/attachments/905075947282268187/906877143173189692/Untitled_Photo.png")
      .setColor("#f4c2c2")
      .setFooter('Page 4')
    let embed5 = new MessageEmbed()
      .setTitle('**Help Menu**')
      .setColor('#FFFFFF')
      .addFields(
        { name: "**FUN COMMANDS**", value: `\`\EIGHTBALL\`\ \`\AKI\`\ \`\ASCII\`\ \`\CATSAY\`\ \`\CHOOSE\`\ \`\CLAP\`\ \`\COWSAY\`\ \`\DAB\`\ \`\EMOJIFY\`\ \`\FLIPTEXT\`\ \`\GIF\`\ \`\GREENTEXT\`\ \`\HACK\`\ \`\HUG\`\ \`\JOKE\`\ \`\KANYE\`\ \`\KILL\`\ \`\MAM\`\ \`\MEME\`\ \`\NITRO\`\ \`\ORANGE TEXT\`\ \`\POKEIMG\`\ \`\RESPECT\`\ \`\REVERSE\`\ \`\ROAST\`\ \`\SLAP\`\ \`\SUDO\`\ \`\TRIVIA\`\ \`\VAPORTEXT\`\  ` })
      .setColor("#f4c2c2")
      .setImage("https://cdn.discordapp.com/attachments/905075947282268187/906877143173189692/Untitled_Photo.png")
      .setFooter('Page 5')

    let embed6 = new MessageEmbed()

      .setTitle('**Help Menu**')
      .setColor('#FFFFFF')
      .addFields(
        { name: "**GAMES COMMANDS**", value: `\`\CATCHTHEFISH\`\ \`\QUICKCLICK\`\ \`\C4\`\ \`\FASTTYPE\`\ \`\FIGHT\`\ \`\FOOTBALL\`\ \`\GUESSTHEPOKEMON\`\ \`\GUESSTHENUMBER\`\ \`\GUNFIGHT\`\ \`\LIESWATTER\`\ \`\ROADRACE\`\ \`\RPS\`\ \`\SNAKE\`\ \`\TTT\`\ \`\WOULDYOURATHER\`\ ` })
      .setImage("https://cdn.discordapp.com/attachments/905075947282268187/906877143173189692/Untitled_Photo.png")
      .setColor("#f4c2c2")
      .setFooter('Page 6')
    let embed7 = new MessageEmbed()
      .setTitle('**Help Menu**')
      .setColor('#FFFFFF')
      .addFields(
        { name: "**IMAGE COMMANDS**", value: `\`\ACHIEVEMENT\`\ \`\ALERT\`\ \`\AMAZEME\`\ \`\AMIAJOKE\`\ \`\BAD\`\ \`\BIDEN\`\ \`\CHALLENGE\`\ \`\CHANGEMYMIND\`\ \`\CLYDE\`\ \`\CREATEMEME\`\ \`\DOCKOFSHAME\`\ \`\DRAKE\`\ \`\FACTS\`\ \`\ILLEGAL\`\ \`\MEMETEMPLATE\`\ \`\PHB\`\ \`\SCROLL\`\ \`\TEXTIMAGE\`\ \`\TRASH\`\ \`\TRIGGER\`\ \`\TRUMPTWEET\`\ \`\WASTED\`\ \`\WIDEAVATAR\`\  ` })
      .setImage("https://cdn.discordapp.com/attachments/905075947282268187/906877143173189692/Untitled_Photo.png")
      .setColor("#f4c2c2")
      .setFooter('Page 7')

    let embed9 = new MessageEmbed()
      .setTitle('**Help Menu**')
      .setColor('#FFFFFF')
      .addFields(
        { name: "**INFO COMMANDS**", value: `\`\BOTINFO\`\ \`\EMOJIID\`\ \`\HELP\`\ \`\INVITE\`\ \`\PING\`\ \`\BUGREPORT\`\   ` })
      .setImage("https://cdn.discordapp.com/attachments/905075947282268187/906877143173189692/Untitled_Photo.png")
      .setColor("#f4c2c2")
      .setFooter('Page 9')

    let embed10 = new MessageEmbed()
      .setTitle('**Help Menu**')
      .setColor('#FFFFFF')
      .addFields(
        { name: "**MOD COMMANDS**", value: `\`\ADDROLEALL\`\ \`\BAN\`\ \`\DM\`\ \`\KICK\`\ \`\MUTE\`\  \`\REMOVEROLEALL\`\ \`\SOFTBAN\`\ \`\TEMPMUTE\`\ \`\UNMUTE\`\ \`\STEALMOJI\`\ \`\TICKET\`\  ` })
      .setFooter('Page 10')
      .setImage("https://cdn.discordapp.com/attachments/905075947282268187/906877143173189692/Untitled_Photo.png")
      .setColor("#f4c2c2")
    let embed11 = new MessageEmbed()
      .setTitle('**Help Menu**')
      .setColor('#FFFFFF')
      .addFields({ name: "**UTILITY COMMANDS**", value: "`avatar` `animesearch` `announce``calculator` `clear` `createrole` `delchannel` `delrole` `enlargemoji` `esay` `giverole` `google` `imdb` `lock` `newtext` `newvoice` `nickname` `poll` `removerole` `say` `servericon` `serverinfo` `dump` `translate` `unlock` `weather` `wiki` `youtube` `findemoji` `rolelist`" })
      .setImage("https://cdn.discordapp.com/attachments/905075947282268187/906877143173189692/Untitled_Photo.png")
      .setColor("#f4c2c2")
      .setFooter('Page 11')

    const filter = i => i.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({
      filter,
      time: 18000,
      componentType: "SELECT_MENU"
    });


    collector.on("collect", async (collected) => {
      const value = collected.values[0]
      if (value === "0") {
        collected.update({ embeds: [embed], components: [row, row2] })
      }
      if (value === "1") {
        collected.update({ embeds: [embed1], components: [row, row2] })
      }
      if (value === "2") {
        collected.update({ embeds: [embed2], components: [row, row2] })
      }
      if (value === "3") {
        collected.update({ embeds: [embed3], components: [row, row2] })
      }
      if (value === "4") {
        collected.update({ embeds: [embed4], components: [row, row2] })
      }
      if (value === "5") {
        collected.update({ embeds: [embed5], components: [row, row2] })
      }
      if (value === "6") {
        collected.update({ embeds: [embed6], components: [row, row2] })
      }
      if (value === "7") {
        collected.update({ embeds: [embed7], components: [row, row2] })
      }

      if (value === "9") {
        collected.update({ embeds: [embed9], components: [row, row2] })
      }
      if (value === "10") {
        collected.update({ embeds: [embed10], components: [row, row2] })
      }
      if (value === "11") {
        collected.update({ embeds: [embed11], components: [row, row2] })
      }
    })


  }
}