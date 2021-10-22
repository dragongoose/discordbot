const { Message, Client } = require("discord.js");
const config = require("../../config.json");
const guildSettings = require("../../schema/guildsettings.js")

module.exports = {
    name: "autowordboard",
    description: "Sets up a message that updates every 60 seconds for the top 10 most said words.",
    //aliases: ['repeat'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {
        var channel;
        if (!msg.member.permissions.has('MANAGE_GUILD')) return msg.reply('No Perms!');
        try {
            channel = msg.guild.channels.cache.get(args[0])
        } catch(e) {
            msg.channel.send('Couldnt find the channel')
            console.log(e)
        }

        if(channel === undefined) return msg.channel.send('Couldnt find the channel');

        var setup = await channel.send('Setting up...')

        const allsettings = await guildSettings.findOne({ guildID: msg.guild.id });

        if (allsettings === null) {
            var emptysettings = new guildSettings({
                guildID: msg.guild.id,
                settingsJson: {
                    wordboard: {
                        channel: args[0],
                        message: setup.id
                    }
                },
            })
            await emptysettings.save();
            msg.channel.send('Set')
        }

        guildSettings.findOne({ guildID: msg.guild.id })
        .then(set => {
            var parsed = JSON.parse(JSON.stringify(set))

            var oldsettings = parsed.settingsJson
            var newsettings = oldsettings

            console.log(newsettings)

            newsettings.wordboard.channel = args[0]
            newsettings.wordboard.message = setup.id
            
            set.guildID = msg.guild.id;
            set.settingsJson = newsettings

            set.markModified('guildID');
            set.markModified('settingsJson');

            set.save((err) => {
                console.log(err)
            });
            msg.channel.send('Updated!')
            
        });

    },
};
