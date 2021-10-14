const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const fetch = require("node-fetch")

module.exports = {
    name: "youtubetogether",
    description: "repeats what a player says",
    aliases: ['yttogether'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        const channel = msg.member.voice.channel;

        if(!channel) return msg.channel.send('You must be in a vc')

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 0,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization":`Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(invite => {
            if(!invite.code) return msg.channel.send('Error');
            const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Youtube Together started!`)
            .setDescription(`[Click here to join youtube together!](https://discord.com/invite/${invite.code})`)
            .setTimestamp()
            .setFooter(msg.author.tag, msg.author.avatarURL());

            msg.channel.send({ embeds:[embed] })
        })

    },
};
