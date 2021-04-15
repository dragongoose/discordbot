//Hello from dragonshadow14!
const { Client } = require("discord.js-commando");
const path = require("path");
const config = require("./config.json");
const levelfunc = require("./utils/levelfunc");
const Levels = require("discord-xp");



const client = new Client({
  commandPrefix: "$", //set bot command prefix
  owner: "config.ownerid", //set bot owner id
});

//register command groups and disable commands
client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["misc", "Misc"],
    ["weather", "Weather"],
    ["ranking", "Ranking"],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false,
    unknownCommand: false,
    ping: false,
  })
  .registerCommandsIn(path.join(__dirname, "commands"));


//Run when ready
client.once("ready", () => {

  //console.log when logged in
  console.log(`Logged in as ${client.user.tag}`);

  //Set Activity
  client.user.setActivity("retards using $say", {
    type: "STREAMING",
    url: "https://www.youtube.com/watch?v=DLzxrzFCyOs",
  });

});

//Give a random ammount of XP every message.

Levels.setURL(config.dburl); //Set mongodb url for discord-xp

client.on("message", async (message) => {
  if (!message.guild) return; //ignore if message wasnt in a server
  if (message.author.bot) return; //ignore if message was from a bot

  const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Random number for xp
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp); //give the random ammount of xp

  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id); //get user level
    message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`); //send message when user levels up
    levelfunc.checkLevel(user.level, message, message.author.id); //nake sure user has the correct roles
    levelfunc.levelRole(user.level, message, message.author.id); //remove previous level role and give new one
  }
});

client.login(config.token); //login
