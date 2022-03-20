var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing
} = require(`../../handlers/functions`);
module.exports = {
  name: "setup-embed",
  category: "💪 Setup",
  aliases: ["setupembed", "embed-setup", "embedsetup"],
  cooldown: 5,
  usage: "setup-embed  -->  Follow Steps",
  description: "Change the Look of your Embeds (Color, Image, Thumbnail, ...)",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    var es = client.settings.get(message.guild.id, "embed")    
    try {
      var adminroles = client.settings.get(message.guild.id, "adminroles")

        var timeouterror = false;
        var filter = (reaction, user) => {
          return user.id === message.author.id;
        };
        var temptype = ""
        var tempmsg;
  
        tempmsg = await message.channel.send(new Discord.MessageEmbed()
          .setTitle("What do you want to do?")
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setDescription(`1️⃣ **==** Change the **Color** of the Embeds\n\n2️⃣ **==** Change the **Image** of the Embeds\n\n3️⃣ **==** Change the **Footer Text** of the Embeds\n\n4️⃣ **==** ${es.thumb ? "**Disable** the Thumbnail for Embeds" : "**Enable** the Thumbnail for Embeds"}\n\n\n\n*React with the Right Emoji according to the Right action*`).setFooter(es.footertext, es.footericon)
        )
        try {
          tempmsg.react("1️⃣")
          tempmsg.react("2️⃣")
          tempmsg.react("3️⃣")
          tempmsg.react("4️⃣")
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:cross:899255798142750770>  ERROR | Missing Permissions to add Reactions")
            .setColor(es.wrongcolor)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
        }
        await tempmsg.awaitReactions(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            var reaction = collected.first()
            reaction.users.remove(message.author.id)
            if (reaction.emoji.name === "1️⃣") temptype = "color"
            else if (reaction.emoji.name === "2️⃣") temptype = "image"
            else if (reaction.emoji.name === "3️⃣") temptype = "footertext"
            else if (reaction.emoji.name === "4️⃣") temptype = "thumb"
            else throw "You reacted with a wrong emoji"
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:cross:899255798142750770>  ERROR | Your Time ran out")
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
            .setFooter(es.footertext, es.footericon)
          );
  
  
        if (temptype == "color") {
  
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("What Color do you want?")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`Send it now!\n\nMake sure to use a valid **HEX CODE** forexample: **\`#ffee22\`** __with__ the \`#\``)
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(collected => {
              var color = collected.first().content;
              if (!color) return message.reply(new Discord.MessageEmbed()
                .setTitle("<:cross:899255798142750770>  ERROR | Please add a valid COLOR")
                .setColor(es.wrongcolor)
                .setDescription(`Note that a HEX COLOR looks like that: \`#ffee22\``)
                .setFooter(es.footertext, es.footericon)
              );
              if (color.length != 7 && !color.includes("#")) return message.reply(new Discord.MessageEmbed()
                .setTitle("<:cross:899255798142750770>  ERROR | Please add a valid COLOR")
                .setColor(es.wrongcolor)
                .setDescription(`Note that a HEX COLOR looks like that: \`#ffee22\``)
                .setFooter(es.footertext, es.footericon)
              );
              try {
                client.settings.set(message.guild.id, color ,"embed.color")
                es = client.settings.get(message.guild.id, "embed")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<:tick:899255869185855529> The new Embed Color is: \`${es.color}\``)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:cross:899255798142750770>  ERROR | Something went wrong, please contact: `S409™#9685`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle("<:cross:899255798142750770>  ERROR | Your Time ran out")
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );
  
        } else if (temptype == "image") {
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("Which Image do you want to use?")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`Note that you may not delete this image from where ever the source is from! A Link is appreciated`)
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(collected => {
              var url = collected.first().content;
              function attachIsImage(msgAttach) {
                url = msgAttach.url;
                //True if this url is a png image.
                return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
                  url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
                  url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
                }

              if (collected.first().attachments.size > 0) {
                if (collected.first().attachments.every(attachIsImage)) {
                  try {
                    client.settings.set(message.guild.id, url ,"embed.footericon")
                    es = client.settings.get(message.guild.id, "embed")
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(`<:tick:899255869185855529> The new Embed Image is: \`${es.link}\``)
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                    );
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle("<:cross:899255798142750770>  ERROR | Something went wrong, please contact: `S409™#9685`")
                      .setColor(es.wrongcolor)
                      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                } else {
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle("<:cross:899255798142750770>  ERROR | Please add a valid IMAGE-LINK")
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                  );
                }
                } else if (!url.includes("http") && !(url.toLowerCase().includes("png")||url.toLowerCase().includes("gif")||url.toLowerCase().includes("jpg"))){
                  return message.reply(new Discord.MessageEmbed()
                    .setTitle("<:cross:899255798142750770>  ERROR | Please add a valid IMAGE-LINK")
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                  );
                } else {
                  try {
                    client.settings.set(message.guild.id, url ,"embed.footericon")
                    es = client.settings.get(message.guild.id, "embed")
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle(`<:tick:899255869185855529> The new Embed Image is: \`${es.link}\``)
                      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                      .setFooter(es.footertext, es.footericon)
                    );
                  } catch (e) {
                    return message.reply(new Discord.MessageEmbed()
                      .setTitle("<:cross:899255798142750770>  ERROR | Something went wrong, please contact: `S409™#9685`")
                      .setColor(es.wrongcolor)
                      .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                      .setFooter(es.footertext, es.footericon)
                    );
                  }
                }
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle("<:cross:899255798142750770>  ERROR | Your Time ran out")
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );
        } else if (temptype == "footertext") {
          tempmsg = await tempmsg.edit({embed: new Discord.MessageEmbed()
            .setTitle("What should be your new Footer Text?")
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setDescription(`Note that it's the Text that's very small and at the bottom of an Embed\n\nEnter the Text now!`)
            .setFooter(es.footertext, es.footericon)
          })
          await tempmsg.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 90000,
              errors: ["time"]
            })
            .then(collected => {
              var text = collected.first().content;
              try {
                client.settings.set(message.guild.id, text, "embed.footertext")
                es = client.settings.get(message.guild.id, "embed")
                return message.reply(new Discord.MessageEmbed()
                  .setTitle(`<:tick:899255869185855529> The new Embed Footer Text is:`.substr(0, 256))
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setDescription(es.footertext)
                  .setFooter(es.footertext, es.footericon)
                );
              } catch (e) {
                return message.reply(new Discord.MessageEmbed()
                  .setTitle("<:cross:899255798142750770>  ERROR | Something went wrong, please contact: `S409™#9685`")
                  .setColor(es.wrongcolor)
                  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                  .setFooter(es.footertext, es.footericon)
                );
              }
            })
            .catch(e => {
              timeouterror = e;
            })
          if (timeouterror)
            return message.reply(new Discord.MessageEmbed()
              .setTitle("<:cross:899255798142750770>  ERROR | Your Time ran out")
              .setColor(es.wrongcolor)
              .setDescription(`Cancelled the Operation!`.substr(0, 2000))
              .setFooter(es.footertext, es.footericon)
            );
          } else if (temptype == "thumb") {
            try {
              client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "embed.thumb") ,"embed.thumb")
              es = client.settings.get(message.guild.id, "embed")
              return message.reply(new Discord.MessageEmbed()
                .setTitle(`<:tick:899255869185855529> The Thumbnail is now ${es.thumb ? "enabled": "disabled"}`)
                .setDescription(`${es.thumb ? "I will now add Thumbnails to each Embed Message": "I will now **not** add a Thumbnail to Embed Messages"}`)
                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                .setFooter(es.footertext, es.footericon)
              );
            } catch (e) {
              return message.reply(new Discord.MessageEmbed()
                .setTitle("<:cross:899255798142750770>  ERROR | Something went wrong, please contact: `S409™#9685`")
                .setColor(es.wrongcolor)
                .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                .setFooter(es.footertext, es.footericon)
              );
            }
          } else {
          return message.reply(new Discord.MessageEmbed()
            .setTitle("<:cross:899255798142750770>  ERROR | PLEASE CONTACT `S409™#9685`")
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
          );
        }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:cross:899255798142750770>  Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  },
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
