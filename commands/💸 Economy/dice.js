const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "dice",
  category: "💸 Economy",
  description: "Earn your dice cash",
  usage: "dice <roll-result> <Gamble-Amount>",
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
      //command
      var user = message.author
      if(user.bot) return message.reply("<:cross:899255798142750770>  **A Discord Bot can not have Economy!**")
      
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, user.id)
      //get the economy data 
      let data = client.economy.get(`${message.guild.id}-${user.id}`)
      //get the delays
      
      var roll = args[0] //Should be a number between 1 and 6
      var amount = args[1] //Coins to gamble

      if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll)))
        return message.reply(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:cross:899255798142750770>  Specify the \`roll-result\`, it should be a number between \`1\`-\`6\``)
          .setDescription(`Usage: \`${prefix}dice <roll-result> <Gamble-Amount>\`\n\n\Example: \`${prefix}dice 3 100\``)
        );
      if (!amount) 
        return message.reply(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:cross:899255798142750770>  Specify the **amount of \`Coins 💸\`** you want to gamble!`)
          .setDescription(`Usage: \`${prefix}dice <roll-result> <Gamble-Amount>\`\n\n\Example: \`${prefix}dice 3 100\``)
        );

      if (data.balance < amount) return message.reply(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:cross:899255798142750770>  You can't gamble more Money than you have in your **👛 Pocket (\`${data.balance} 💸\`)**`)
      );
      var valid_Numbers = [1, 2, 3, 4, 5, 6];
      var result = valid_Numbers[Math.floor((Math.random() * valid_Numbers.length))]
      let win = false;
      if(parseInt(roll) == result) win = true;
      if (win) {
        //double the amount
        amount *= 4; 
        //write the DB
        client.economy.math(`${message.guild.id}-${message.author.id}`, "+", amount, "balance");
        //get the latest data
        data = client.economy.get(`${message.guild.id}-${message.author.id}`);
        //send the Information Message
        message.channel.send(new MessageEmbed()
          .setTitle(`<:tick:899255869185855529> You've won \`${amount} 💸\``)
          .setDescription(`**The Dice rolled: \`${result}\`**\n\n👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        )
      } else {
        //write the DB
        client.economy.math(`${message.guild.id}-${message.author.id}`, "-", amount, "balance")
        //get the latest data
        data = client.economy.get(`${message.guild.id}-${message.author.id}`)
        //send the Information Message
        message.channel.send(new MessageEmbed()
          .setTitle(`<:cross:899255798142750770>  You've lost \`${amount} 💸\``)
          .setDescription(`**The Dice rolled: \`${result}\`**\n\n👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
          .setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        )
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
