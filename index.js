const { Client }= require('discord.js-commando');
const path = require('path');
const fetch = require('node-fetch');
const config = require ('./config');
const levelfunc = require('./utils/levelfunc');

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


//Give a random ammount of XP every message.
client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
      
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
  
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
      levelfunc.checkLevel(user.level, message, message.author.id);
      levelfunc.levelRole(user.level, message, message.author.id)
    }
  });




client.login(config.token);
