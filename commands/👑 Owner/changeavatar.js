var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
const fs = require('fs');
const fetch = require('node-fetch');
var {
  databasing, isValidURL
} = require(`../../handlers/functions`);
module.exports = {
  name: "changeavatar",
  category: "👑 Owner",
  aliases: ["changebotavatar", "botavatar", "botprofilepicture", "botpfp"],
  cooldown: 5,
  usage: "changeavatar <Imagelink/Image>",
  description: "Changes the Avatar of the BOT: I SUGGEST YOU TO DO IT LIKE THAT: Type the command in the Chat, attach an Image to the Command (not via link, just add it) press enter",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:cross:899255798142750770>  You are not allowed to run this Command`)
          .setDescription(`You need to be one of those guys: ${config.ownerIDS.map(id => `<@${id}>`)}`)
        );
    try {
      var url;
      if (message.attachments.size > 0) {
        if (message.attachments.every(attachIsImage)) {
          const response = await fetch(url);
          const buffer = await response.buffer();
          fs.writeFile(`./image.jpg`, buffer, () => 
            console.log('finished downloading!'));
          client.user.setAvatar(`./image.jpg`)
          .then(user => {
            return message.channel.send(new MessageEmbed()
            .setTitle(`<:tick:899255869185855529> Successfully, changed the Bot avatar!`)
            .setColor(es.color)
            .setFooter(es.footertext, es.footericon)
          );
          })
          .catch(e=>{
            return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:cross:899255798142750770>  Something went Wrong`)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
          );
          });
        } else {
          return message.channel.send(new MessageEmbed()
            .setTitle(`<:cross:899255798142750770>  ERROR | Could not use your Image as an Avatar, make sure it is a \`png\` / \`jpg\``)
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
          );
        }
      } else if (message.content && textIsImage(message.content)) {
        url = args.join(" ")
        const response = await fetch(url);
        const buffer = await response.buffer();
        await fs.writeFile(`./image.jpg`, buffer, () => 
          console.log('finished downloading!'));
        client.user.setAvatar(`./image.jpg`)
        .then(user => {
          try{
            fs.unlinkSync()
          }catch{

          }
          return message.channel.send(new MessageEmbed()
          .setTitle(`<:tick:899255869185855529> Successfully, changed the Bot avatar!`)
          .setColor(es.color)
          .setFooter(es.footertext, es.footericon)
        );
        })
        .catch(e=>{
          return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:cross:899255798142750770>  Something went Wrong`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        );
        });
        
      } else {
        return message.channel.send(new MessageEmbed()
            .setTitle(`<:cross:899255798142750770>  ERROR | Could not use your Image as an Avatar, make sure it is a \`png\` / \`jpg\` / \`webp\``)
            .setDescription(`Useage: \`${prefix}changeavatar <AVATARLINK/IMAGE>\``)
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
          );
      }

      function attachIsImage(msgAttach) {
        url = msgAttach.url;

        //True if this url is a png image.
        return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
          url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
          url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
      }
      function textIsImage(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
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
