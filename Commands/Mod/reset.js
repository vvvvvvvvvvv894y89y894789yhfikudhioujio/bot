const Discord = module.require("discord.js");
let result = Math.floor(Math.random() * 67867584367868743837);

module.exports = {
  name: "reset",
  description: "Send DM message to a user",
  userPerms: ["MANAGE_GUILD"],
  botPerms: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    message.delete();
    const state = "";
    if (state === "disabled") {
      return message.channel.send(
        "the Command has been disabled because of facing crash issues"
      );
    }
    const userid = args[0];
    if (!userid) {
      return message.channel.send("Enter an ID");
    }
    const msg = args.slice(1).join(" ");
    if (!msg) {
      return message.channel.send("Enter the message");
    }
    const user = client.users.cache.get(`${userid}`);
    const embed = new Discord.MessageEmbed()
      .setTitle("Hello! Your key has been reset on S409HUB")
      .setDescription(`Script will be found in <#961969651200446514> \n\n Key: S409HUB.AUTH_` + [result] + `\n\n Dont think your key is secure? No problem! Open a ticket and ping S409. \n\n **YOUR OLD KEY WILL BE RESET DONT TRY TO USE IT!**`)
      .setFooter("S409HUB")
      .setColor("ORANGE");

    user.send({ embeds: [embed] });
    const errorlogs =   client.channels.cache.get("961968237019541524");
    message.channel.send("Whitelisted!");
errorlogs.send(`<@544245657230245888> New key \n\n S409HUB.AUTH_` + [result] + `\n\n From user: ${message.author.username} \n\n Sent to user <@${userid}> \n\n Delete old key for user <@${userid}>`);
  },
};

