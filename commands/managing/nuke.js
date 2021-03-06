const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "nuke",
    description: "clones a channel and deletes the old one",
    //aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        if (!msg.member.permissions.has('ADMINISTRATOR')) return msg.reply('No Perms!');

        const message = await msg.reply('Woah there, are you sure you want to do this? React with ✅ to continue and ❌ to cancel.')
        
        await message.react('✅')
        await message.react('❌')

        const filter = (reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && (user.id === msg.author.id);


        const collector = message.createReactionCollector({ filter, time: 604800000 });

        collector.on('collect', (reaction, user) => {
            if (user.bot) return;
            if (user.id === msg.author.id) {
                console.log(user.id)
                switch (reaction.emoji.name) {
                    case '✅':
                        msg.channel.clone()
                        .then(channel => channel.send('https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831'))
                        msg.channel.delete()
                        break;
                    case '❌':
                        message.delete()
                        msg.delete()
                        break;
                }
            }

        })

        /*
        const newChannel = await msg.channel.clone()
        newChannel.send('https://giphy.com/gifs/explosion-oe33xf3B50fsc')
        msg.channel.delete()
        */
    },
};
