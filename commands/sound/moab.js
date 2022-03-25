const { Message, Client, Permissions } = require("discord.js");

module.exports = {
    name: "moab",
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

        collector.on('collect', async (reaction, user) => {
            if (user.bot) return;
            if (user.id === msg.author.id) {
                console.log(user.id)
                switch (reaction.emoji.name) {
                    case '✅':
                        let newChannel = await msg.channel.clone()
                        newChannel.send('https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831')
                        let currentChannel = msg.guild.channels.cache.get(msg.channel.id)
                        console.log(currentChannel)
                        currentChannel.overwritePermissions([
                            {
                                id: msg.guild.id,
                                deny: [Permissions.FLAGS.VIEW_CHANNEL],
                            },
                            {
                                id: user.id,
                                allow: [Permissions.FLAGS.VIEW_CHANNEL],
                            },
                        ])
                        message.delete()
                        msg.delete()
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
