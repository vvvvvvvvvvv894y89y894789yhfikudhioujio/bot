const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "deposit",
  category: "💸 Economy",
  aliases: ["tobank"],
  description: "Allows you to deposit a specific amount or everything to your Bank",
  usage: "deposit <AMOUNT/ALL>",
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
    var data = client.economy.get(`${message.guild.id}-${user.id}`)
    if(!args[0])
      return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:cross:899255798142750770>  You didn't provide a valid Argument`)
          .setDescription(`Usage: \`${prefix}deposit <All/Amount>\`\n\n\Example: \`${prefix}deposit 100\``)
        );
    if(args[0].toLowerCase() == "all"){
      client.economy.math(`${message.guild.id}-${user.id}`, "+", data.balance, "bank")
      //set the current time to the db
      client.economy.set(`${message.guild.id}-${user.id}`, 0, "balance")

      var deposited = data.balance;

      data = client.economy.get(`${message.guild.id}-${user.id}`)

      return message.reply(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`<:tick:899255869185855529> You deposited **\`${nFormatter(deposited)}💸\`** to your Bank`)
        .setDescription(`**🏦 You now have \`${nFormatter(Math.floor(data.bank))} 💸\` in your Bank**\n\n👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
      );
    }else {
      let amount = Number(args[0]);
      if(amount <= 0)
      return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:cross:899255798142750770>  You can't deposit a negative Amount of Money or no Money, to your Bank`)
        );
      
      if(amount > data.balance)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:cross:899255798142750770>  You can't deposit more Money than you have in your **👛 Pocket (\`${nFormatter(data.balance)} 💸\`)**`)
        );
      
      client.economy.math(`${message.guild.id}-${user.id}`, "+", amount, "bank")
      client.economy.math(`${message.guild.id}-${user.id}`, "-", amount, "balance")
      //get the data
      data = client.economy.get(`${message.guild.id}-${user.id}`)
      //show the message
      return message.reply(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        .setTitle(`<:tick:899255869185855529> You deposited **\`${amount}💸\`** to your Bank`)
        .setDescription(`**🏦 You now have \`${nFormatter(Math.floor(data.bank))} 💸\` in your Bank**\n\n👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
      );
    }
  } catch (e) {
    console.log(String(e.stack).bgRed)
    return message.channel.send(new MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
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
