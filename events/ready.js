const client = require("../index");
const distube = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { MessageEmbed } = require('discord.js');
client.distube = new distube.default(client, {
    plugins: [new SpotifyPlugin()],
    searchSongs: 10,
    savePreviousSongs: true
})

client.on("ready", () => {
    console.log(`${client.user.tag} is up and ready to go!`)

    client.user.setActivity("Country Roads", {type: "LISTENING"}) 
    client.user.setStatus('idle')

    const status = queue =>
        `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ')
        || 'Off'}\` | Loop: \`${queue.repeatMode
            ? queue.repeatMode === 2
                ? 'All Queue'
                : 'This Song'
            : 'Off'
        }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

    client.distube.on('error', (channel, error) => {
        console.log(error)

        channel.send(`An error happened.`) // Discord limits 2000 characters in a message
    })

    client.distube
        .on('playSong', (queue, song) => {
            if(['https://www.youtube.com/watch?v=Pa_J0Dw0MwE', 'https://www.youtube.com/watch?v=4Q46xYqUwZQ'].includes(song.url)) return;
            const embed = new MessageEmbed()
                .setDescription(`**Now Playing [${song.name}](${song.url})** \n ${status(queue)}`)
                .addFields(
                    { name: 'Requested by:', value: `<@${song.user.id}>`, inline: true },
                    { name: 'Duration', value: song.formattedDuration, inline: true }
                )
                .setColor(0xD53C55) // Green: 0x00AE86
                .setTimestamp();

            queue.textChannel.send({ embeds: [embed] }).then(msg => {
                setTimeout(() => {
                    msg.delete
                }, song.duration * 1000)
            })
        })
        .on('addSong', (queue, song) => {

            if(['https://www.youtube.com/watch?v=Pa_J0Dw0MwE', 'https://www.youtube.com/watch?v=4Q46xYqUwZQ'].includes(song.url)) return;

            const embed = new MessageEmbed()
                .setDescription(`**Queued [${song.name}](${song.url})**`)
                .addFields(
                    { name: 'Requested by:', value: `<@${song.user.id}>`, inline: true },
                    { name: 'Duration', value: song.formattedDuration, inline: true }
                )
                .setColor(0xD53C55) // Green: 0x00AE86
                .setFooter('hi :3')
                .setTimestamp();

            queue.textChannel.send({ embeds: [embed] })
                .then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, song.duration * 1000)
                })
        })

        .on('addList', (queue, playlist) => {
            const embed = new MessageEmbed()
                .setDescription(`**Queued playlist [${playlist.name}](${playlist.url}) ** \n ${status(queue)}`)
                .addFields(
                    { name: 'Requested by:', value: `<@${playlist.user.id}>`, inline: true },
                )
                .setColor(0xD53C55) // Green: 0x00AE86
                .setFooter('hi :3')
                .setTimestamp();

            queue.textChannel.send({ embeds: [embed] })
        })
        // DisTubeOptions.searchSongs = true
        .on('searchResult', (message, result) => {
            let i = 0
            message.channel.send(
                `**Choose an option from below**\n${result
                    .map(
                        song =>
                            `**${++i}**. ${song.name} - \`${song.formattedDuration
                            }\``,
                    )
                    .join(
                        '\n',
                    )}\n*Enter anything else or wait 30 seconds to cancel*`,
            )
        })
        // DisTubeOptions.searchSongs = true
        .on('searchCancel', message => message.channel.send(`Searching canceled`))
        .on('searchInvalidAnswer', message =>
            message.channel.send(`searchInvalidAnswer`))
        .on('searchNoResult', message => message.channel.send(`No result found!`))
        .on('finish', queue => queue.textChannel.send('Finished queue!'))
        //.on('finishSong', queue => queue.textChannel.send('finished playing'))
        .on('disconnect', queue => queue.textChannel.send('Disconnected!'))
        .on('empty', queue => queue.textChannel.send('Empty!'))

    const guildinvitecache = new Map();
    client.invites = guildinvitecache;

    for(const guild of client.guilds.cache.values()) {
        guild.invites.fetch()
        .then(invite => client.invites.set(guild.id, invite))
        .catch(error => console.log(error));
    }
});




