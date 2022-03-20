const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons')

let os = require("os");

let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
    duration
} = require("../../handlers/functions")
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    category: "🔰 Info",
    description: "Sends detailed info about the client",
    usage: "botinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            cpuStat.usagePercent(function (e, percent, seconds) {
                if (e) {
                    return console.log(String(e.stack).red);
                }
                let connectedchannelsamount = 0;
                let guilds = client.guilds.cache.map((guild) => guild);
                for (let i = 0; i < guilds.length; i++) {
                    if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                }
                if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                //info
                const botinfo = new Discord.MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setTitle("__**BOTINFO**__")
                    .setColor(ee.color)
                    .addField("📁 Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``)
                    .addField("<:uptime:934911100816863243> Uptime ", `\`${duration(client.uptime)}\``)
                    .addField("<:user:934910822088601670> Users", `\`Total: ${client.users.cache.size} Users\``)
                    .addField("<:servers:934910342507667476> Servers", `\`Total: ${client.guilds.cache.size} Servers\``)
                    .addField("🎙️ Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "voice").size}\``)
                    .addField("<:connectedchannels:934909904945295370> Connected Channels", `\`${connectedchannelsamount}\``)
                    .addField("<:discordjs:934909613122396190> Discord.js", `\`v${Discord.version}\``)
                    .addField("<:nodejs:934909403537219624> Node", `\`${process.version}\``)
                    .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                    .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``)
                    .addField("🤖 Arch", `\`${os.arch()}\``)
                    .addField("<:image_20220118_204625removebgpre:933100266310492193>  API Latency", `\`${client.ws.ping}ms\``)
                    .addField("<:image_20220118_204407removebgpre:933099580529197078> Developer",
                    `\` 1 • S409™#9685
 2 •  zain.wtf#7733\``)
                    .setFooter("BOT_MUSIC | powered by S409™#9685", "https://images-ext-1.discordapp.net/external/uMRWK6F4YGUJpVlChArbZZrIsO8MJ5jnBwz3iDPpRiA/https/cdn.discordapp.com/avatars/882819636763189278/d3504eb09b2f47359eb408540db6fabf.webp");

                message.channel.send(botinfo);
            })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.message}\`\`\``)
            );
        }
    },
};