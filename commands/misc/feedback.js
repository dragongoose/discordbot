const { Message, Client, MessageEmbed, WebhookClient } = require("discord.js");
const { feedbackwebhookid, feedbackwebhooktoken } = require("../../config.json");
const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/879553807686713417/UXbGfDYpIVAEttEAOpSSu_4wBEptYQ3zsZJj79eSiwWth2nxAkqkVCcy-gp-bNECeyr3' });

module.exports = {
    name: "feedback",
    description: "report feedback",
    aliases: ['bug'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {
        
        if(["753237899951997049", "870824696319475742"].includes(msg.guild.id)) {
            return msg.reply('This guild has been banned from using this command.\nReason: Abuse')
        }

        const embed = new MessageEmbed()
            .setTitle(`Feedback from ${msg.author.tag}`)
            .setDescription(`guild ${msg.guild.id}|${msg.guild.name}, at ${new Date()}`)
            .addFields(
                { name: 'Feedback', value: args.join(' ') }
            )
            .setColor('#0099ff')

        webhookClient.send({
            username: 'hell yea',
            avatarURL: 'https://cdn.discordapp.com/avatars/878791981965385728/2b43bb496c8d518980fe2db100cfbf94.png',
            embeds: [embed],
        })
            .then(() => {
                msg.channel.send('Sent! Thanks for your feedback!')
            })
            .catch(e => {
                msg.channel.send('an error occured')
                console.log(e)
            })

    },
};
