const client = require("../index");
const distube = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { MessageEmbed } = require('discord.js');
client.distube = new distube.default(client, {
    plugins: [new SpotifyPlugin()],
    searchSongs: 10,
    savePreviousSongs: true,
    youtubeDL: false
})

client.on("ready", () => {
    console.log(`${client.user.tag} is up and ready to go!`)

    client.user.setActivity("Country Roads", {type: "LISTENING"}) 
    client.user.setStatus('idle')

    const guildinvitecache = new Map();
    client.invites = guildinvitecache;

    for(const guild of client.guilds.cache.values()) {
        guild.invites.fetch()
        .then(invite => client.invites.set(guild.id, invite))
        .catch(error => console.log(error));
    }


});




