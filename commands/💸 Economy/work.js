const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {MessageEmbed} = require("discord.js");
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "work",
  category: "💸 Economy",
  description: "Lets you work a job",
  usage: "work",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "ECONOMY")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:cross:899255798142750770>  THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
    try {
      var user = message.author;
      
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, user.id)
      if(user.bot) return message.reply("<:cross:899255798142750770>  **A Discord Bot can not have Economy!**")
      let data = client.economy.get(`${message.guild.id}-${user.id}`)
      //time delay for the Work
      let timeout = 25 * 60 * 1000;
      //if user is on cooldown error
      if(data.work !== 0 && timeout - (Date.now() - data.work) > 0){
        let time = duration(timeout - (Date.now() - data.work));
        return message.reply({embed: new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:cross:899255798142750770>  You've already worked recently!`)
          .setDescription(`🕐 **Try again in ${time.map(i=> `\`${i}\``).join(", ")}**\n\n👛 You still have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
        });
      } 
      //YEA
      else {
        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic', "Prostitute", "Stripper", "Dancer", "Drawer", "Lawer", "Agent", "Superman", "Moderator", "Gamer"]
        //get a random work job
        let result = Math.floor((Math.random() * replies.length));
        //get a random money amount
        let amount = Math.floor(Math.random() * 200) + 50 ;
        if(amount > 200) amount = amount - Math.floor(Math.random() * 50) + 1;
        amount = amount * data.black_market.boost.multiplier
        //add the Money to the User's Balance in this Guild
        client.economy.math(`${message.guild.id}-${user.id}`, "+", amount, "balance")
        //set the current time to the db
        client.economy.set(`${message.guild.id}-${user.id}`, Date.now(), "work")
        //get the new data
        data = client.economy.get(`${message.guild.id}-${user.id}`)
        //return some message!
        return message.reply(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:tick:899255869185855529> You worked as a **${replies[result]}** and earned \`${nFormatter(amount)} 💸\``)
          .setDescription(`👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
        );
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:cross:899255798142750770>  An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
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
