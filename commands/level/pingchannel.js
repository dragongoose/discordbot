const { Message, Client } = require("discord.js");
const config = require("../../config.json");
const mongoose = require('mongoose');
const { user } = require("../..");
mongoose.connect(config.dburl, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
    name: "pingchannel",
    //aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        if (msg.guild.channels.cache.get(args[0]) === undefined) {
            return msg.channel.send(`Channel ${args[0]} doesnt exist!`)
        };
        
        const pingchannelSchema = new mongoose.Schema({
            channel: String,
            guild: String
        });


        let pingchannel
        try {
            pingchannel = mongoose.model('pingchannel')
        } catch (error) {
            pingchannel = mongoose.model('pingchannel', pingchannelSchema)
        }

        const userExists = await pingchannel.exists({
            channel: args[0],
            guild: msg.guild.id
        });

        if (userExists) {
            pingchannel.findOne({ channel: args[0], guild: msg.guild.id })
                .then(pingchnl => {
                    pingchnl.channel = args[0]
                    pingchnl.guild = msg.guild.id;

                    pingchnl.markModified('channel');
                    pingchnl.markModified('guild');

                    pingchnl.save(err => console.log('error'));

                    msg.channel.send('done')

                });
        } else {
            const pingchannelid = new pingchannel({
                channel: args[0],
                guild: msg.guild.id
            })
    
            pingchannelid.save()
                .then(() => {
                    return msg.channel.send('done')
                })
                .catch((e) => {
                    msg.channel.send('a error happened and stole my kids :<')
                    console.log(e)
                })
        }

    },
};
