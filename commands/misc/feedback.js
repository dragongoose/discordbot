const { Command } = require('discord.js-commando')
const config = require('../../config.json')


module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'feedback',
            aliases: ['bugs'],
            group: 'misc',
            memberName: 'feedback',
            description: 'send feedback to the owner',
            guildOnly: true,
            args: [
                {
                    type: "string",
                    prompt: "what would you like to say",
                    key: "text",
                }
            ]
        })
    }
    run(msg, { text }) {
        const { MessageEmbed, WebhookClient } = require('discord.js');
        const webhookClient = new WebhookClient(config.feedbackwebhookid, config.feedbackwebhooktoken);

        const embed = new MessageEmbed()
            .setTitle(`Feedback from ${msg.author.tag}`)
            .setDescription(`guild ${msg.guild.id}|${msg.guild.name}, at ${new Date()}`)
            .addFields(
                { name: 'Feedback', value: text }
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


    }
};