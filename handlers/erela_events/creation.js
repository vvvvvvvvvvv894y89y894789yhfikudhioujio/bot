var {
    Manager
  } = require("erela.js"),
  
    Spotify = require("erela.js-spotify"),
    Deezer = require("erela.js-deezer"),
  
    config = require("../../botconfig/config.json"),
  
    clientID = config.spotify.clientID,
    clientSecret = config.spotify.clientSecret;
  module.exports = (client) => {
      if (!clientID || !clientSecret) {
        client.manager = new Manager({
          nodes: config.clientsettings.nodes,
          plugins: [
            new Deezer()
          ],
          send(id, payload) {
            var guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
          },
        });
      } else {
        client.manager = new Manager({
          nodes: config.clientsettings.nodes,
          plugins: [
            new Spotify({
              clientID, //get a clientid from there: https://developer.spotify.com/dashboard
              clientSecret
            }),
            new Deezer()
          ],
          send(id, payload) {
            var guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
          },
        });
      }
      //require the other events
      require("./node_events")(client)
      require("./client_events")(client)
      require("./events")(client)
      
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
  