const { Message, Client } = require("discord.js");
const config = require("../../config.json");
const guildSettings = require("../../schema/guildsettings.js")

module.exports = {
    name: "setupstarboard",
    description: "Interactive setup for starboard.",
    //aliases: ['repeat'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        var channel = client.channels.cache.get(args[0])
        if(!channel) return msg.reply("I couldn't find the channel")

        guildSettings.findOne({ guildID: msg.guild.id })
          .then(set => {
            var parsed = JSON.parse(JSON.stringify(set))

            if (!parsed) {
              var emptysettings = new guildSettings({
                guildID: msg.guild.id,
                settingsJson: {
                  starboard: {
                    channelId: args[0],
                  }
                },
              })
              emptysettings.save();
              return msg.channel.send('Set')
            } else {
              var oldsettings = parsed.settingsJson;
              var newsettings = oldsettings


              newsettings.starboard = {
                channelId: args[0],
              }

              set.settingsJson = newsettings

              set.markModified('settingsJson');

              set.save();
              return msg.channel.send('done!')
            }
          });

    },
};
