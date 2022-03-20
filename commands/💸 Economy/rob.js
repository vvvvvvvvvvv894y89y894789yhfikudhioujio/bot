const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "rob",
  category: "💸 Economy",
  description: "Rob Money from a Specific User, you can Ping him, add his ID / Username, it will be a random amount!",
  usage: "rob @USER",
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
      var user;
      if(args[0]){
        try{
            user = await GetUser(message, args)
        }catch (e){
          if(!e) return message.reply("<:cross:899255798142750770>  UNABLE TO FIND THE USER")
          return message.reply(e)
        }
      }
      if(!user)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(`<:cross:899255798142750770>  You didn't pinged to whom you want to rob`)
          .setDescription(`Usage: \`${prefix}rob <@USER>\`\n Mind you can also use a Name / Id, which would be nicer!`)
        );
      if(user.bot) return message.reply("<:cross:899255798142750770>  **A Discord Bot can not have Economy!**")
      
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, user.id)
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, message.author.id)
      //get the economy data 
      let data = client.economy.get(`${message.guild.id}-${message.author.id}`)
      let data2 = client.economy.get(`${message.guild.id}-${user.id}`)

      //get the delays
      let timeout = 86400000;

      if(data.rob !== 0 && timeout - (Date.now() - data.rob) > 0){
        let time = duration(timeout - (Date.now() - data.rob));
        return message.reply({embed: new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(`<:cross:899255798142750770>  You've already robbed Today!!`)
          .setDescription(`Try again in ${time.map(i=> `\`${i}\``).join(", ")}\n\n👛 You still have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
        });
      } 
      //YEA
      else {
        if(data2.balance < 500) return message.reply("<:cross:899255798142750770>  He does not have enough balance!")
        let amountarray = [300, 350, 400, 340, 360, 350, 355, 345, 365, 350, 340, 360, 325, 375, 312.5, 387.5];
        let amount = Math.floor(amountarray[Math.floor((Math.random() * amountarray.length))]);
        amount = amount * data.black_market.boost.multiplier
        //add the Money to the User's Balance in this Guild
        client.economy.math(`${message.guild.id}-${message.author.id}`, "+", amount, "balance")
        client.economy.math(`${message.guild.id}-${user.id}`, "-", amount, "balance")
        //set the current time to the db
        client.economy.set(`${message.guild.id}-${message.author.id}`, Date.now(), "rob")
        //get the new data
        data = client.economy.get(`${message.guild.id}-${message.author.id}`)
        //return some message!
        return message.reply(new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
          .setTitle(`<:tick:899255869185855529> You robbed \`${amount} 💸\` of \`${user.tag}\``)
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
