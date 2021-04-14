const { Client }= require('discord.js-commando')
const path = require('path')
const fetch = require('node-fetch')
const config = require ('./config')

const client = new Client({
    commandPrefix: '$',
    owner: '300367388300541953'
})

client.registry
.registerDefaultTypes()
.registerGroups([
    ['misc', 'Misc'],
    ['weather', 'Weather'],
    ['ranking', 'Ranking']
])
.registerDefaultGroups()
.registerDefaultCommands({
    eval: false,
    unknownCommand: false,
    ping: false,
})
.registerCommandsIn(path.join(__dirname, 'commands'))

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('retards using $say', {
        type: 'STREAMING',
        url: "https://www.youtube.com/watch?v=DLzxrzFCyOs"
    })
});



module.exports = client






client.login(config.token);
