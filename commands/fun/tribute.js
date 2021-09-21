const { Message, Client } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "tribute",
    description: "plays groovy's and rythm's last songs before shutting down.",
    //aliases: ['repeat'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        if(!msg.member.voice.channel) return msg.channel.send('You must be in a voice channel.')
        client.distube.play(msg, 'https://www.youtube.com/watch?v=Pa_J0Dw0MwE')
        msg.channel.send('Now playing groovys last song. o7😢')
        setTimeout(() => {
            client.distube.play(msg, 'https://www.youtube.com/watch?v=4Q46xYqUwZQ')
            msg.channel.send('We will miss you groovy.')
            msg.channel.send('Now playing rythms last song. o7😢')
            setTimeout(() => {
                msg.channel.send('RIP Groovy & Rythm. You will both be missed \n Groovy Tribute: A legend that was on the cord ||https://www.youtube.com/watch?v=Pa_J0Dw0MwE|| \n Legends Never Die (ft. Against The Current) ||https://www.youtube.com/watch?v=4Q46xYqUwZQ||')
            }, 213000)
        }, 243600)

    },
};
