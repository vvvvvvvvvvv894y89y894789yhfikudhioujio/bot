const Discord = module.require("discord.js");
let result = Math.floor(Math.random() * 67867584367868743837);

module.exports = {
  name: "bl",
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
      return message.channel.send("Enter the reason fot the blacklist.");
    }
    const user = client.users.cache.get(`${userid}`);
    const embed = new Discord.MessageEmbed()
      .setTitle("Hello! You have been blacklisted on S409HUB :(")
      .setDescription(`The reason is as followed: ${msg}`)
      .setFooter("S409HUB")
      .setColor("RED");

    user.send({ embeds: [embed] });
    const errorlogs =   client.channels.cache.get("961968237019541524");
    message.channel.send("Blacklisted!");
errorlogs.send(`<@544245657230245888> \n\n New user has been blacklisted: <@${userid}> \n\n Reason: ${msg}`); 
  },
};

