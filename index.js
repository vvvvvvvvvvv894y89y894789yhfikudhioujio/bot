<<<<<<< HEAD
const discord = require("discord.js"),
    fs = require('fs'), 
    mysql = require("mysql"),
    colors = require("colors"),
    superagent = require('superagent'),
    request = require('request'),
    config = require('./config.json'),
    cooldowns = new discord.Collection()
=======
const mySecret = process.env['TOKEN']
require("dotenv").config({ path: "src/.env" });

const fs = require("fs");
const chalk = require("chalk");

const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const { DEFAULT_PREFIX, BOT_TOKEN, ERROR_LOGS_CHANNEL, ALEXFLIPNOTE_API_KEY, YT_COOKIE } = require("./config.json");
const { loadCommands } = require("./handler/loadCommands");
const { loadEvents } = require("./handler/loadEvents");
const { loadSlashCommands } = require("./handler/loadSlashCommands")
const { loadPlayerEvents } = require("./handler/loadPlayerEvents");
const { DiscordTogether } = require('discord-together')
const { Player } = require('discord-player')
const Enmap = require("enmap")

const client = new Client({
  allowedMentions: { parse: ["users", "roles"] },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});
const Embeds = require("./functions/embeds/Embeds")
const Logger = require("./functions/Logger/Logger")
const Util = require("./functions/util/Util")

const alexClient = require("alexflipnote.js")
client.images = new alexClient(ALEXFLIPNOTE_API_KEY)
client.discordTogether = new DiscordTogether(client);
client.commands = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/");
client.setMaxListeners(0);
const Cookie = YT_COOKIE;
client.logger = Logger;
client.utils = Util;
client.say = Embeds;
client.player = new Player(client, {
  leaveOnEnd: false,
  leaveOnStop: false,
  leaveOnEmpty: false,
  leaveOnEmptyCooldown: 60000,
  autoSelfDeaf: true,
  initialVolume: 130,
  ytdlDownloadOptions: {
    requestOptions: {
      headers: {
        cookie: Cookie,
      }
    }
  },
})
>>>>>>> e3628553faf977216366a3efbf2c0bfa6a8a81ff

const bot = new discord.Client({disableEveryone: true})
bot.command = new discord.Collection()

const prefix = config.prefix

function log(text, color) {
    let d = new Date(),
        h = d.getHours(),
        m = d.getMinutes(),
        ap = "AM"
    if (h > 12) { h -= 12; ap = "PM" }
    if (m < 10) { m = "0" + m }
    time = h + ":" + m + " " + ap
 
    if (typeof(color) == "undefined") { console.log(colors.grey(time) + " : " + text) }
    if (typeof(color) != "undefined") { console.log(colors.grey(time) + " : " + colors[color](text)) }
}

fs.readdir('./command/', (err, files) => {
  if(err) log(err, "red")

  let jsfile = files.filter(f => f.split('.').pop() === 'js')
  if(jsfile.length <= 0) {
    log("không file để mở", "red")
    return
  }

  log('mở '+ jsfile.length +' file', "green")

  jsfile.forEach((f, i) => {
    let props = require('./command/'+ f)
    bot.command.set(props.help.name, props)
  })
})

function handleConnection() {
    con = mysql.createConnection(config.sql);
 
    con.connect(function(err) {
        if (err) {
            log("[ERROR] An error has occurred while connection: " + err, "red");
            log("[INFO] Attempting to establish connection with SQL database.", "yellow");
            setTimeout(handleConnection, 2000);
        } else {
            log("[SUCCESS] SQL database connection established successfully.", "green");
        }
    });
 
    con.on("error", function(err) {
        console.log("Error: " + err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleConnection();
        } else {
            throw err;
        }
    });
}

con = mysql.createConnection(config.sql);

con.connect(function(err) {
    if (err) {
        log("[ERROR] An error has occurred while connection: " + err, "red");
        log("[INFO] Attempting to establish connection with SQL database.", "yellow");
        setTimeout(handleConnection, 2000);
    } else {
        log("[SUCCESS] SQL database connection established successfully.", "green");
    }
});

con.on("error", function(err) {
    console.log("Error: " + err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        handleConnection();
    } else {
        throw err;
    }
});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

bot.on("ready", () => { 
  log("Bot ON", "green")
})

bot.on("message", async message => {
    if (message.author.equals(bot.user)) return;
    if (!message.content.startsWith(config.prefix)) return;
    const messageArray = message.content.split(/\s+/g)
    const coa = messageArray[0]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const role = message.guild.roles.cache.find(role => role.name === 'Buyer');

    const cmd = bot.command.get(coa.slice(config.prefix.length))
    if(cmd) cmd.run(bot, message, con, log, role, makeid, args)
})


bot.login(config.token)