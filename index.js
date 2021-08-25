//Hello from dragonshadow14!
const { Client } = require("discord.js-commando");
const path = require("path");
const config = require("./config.json");
const levelfunc = require("./utils/levelfunc");
const Levels = require("discord-xp");
const { Database } = require("quickmongo");
const db = new Database(config.dburl);



const client = new Client({
  commandPrefix: "$", //set bot command prefix
  owner: config.ownerid, //set bot owner id
});

//register command groups and disable commands
client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["misc", "Misc"],
    ["weather", "Weather"],
    ["ranking", "Ranking"],
    ["jack", "Jack"],
    ["animal", "Animal"],
    ["sound", "Sound"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    unknownCommand: false,
    ping: false,
  })
  .registerCommandsIn(path.join(__dirname, "commands"));

//penis

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

db.on("ready", () => {
  console.log("Database connected!");
});

//Give a random ammount of XP every message.

Levels.setURL(config.dburl); //Set mongodb url for discord-xp

var times = {}



client.on("message", async (message) => {
  if (!message.guild) return; //ignore if message wasnt in a server
  if (message.author.bot) return; //ignore if message was from a bot

  //db.add(`${msg.author.id}.msgtotal`, 1)

  if(times[message.author.id] === undefined) times[message.author.id] = Date.now();

  if( Date.now() >= times[message.author.id] + 30000){

    //db.add(`${msg.author.id}.msgtwdlvl`, 1)

    times[message.author.id] = Date.now();

    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Random number for xp
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp); //give the random ammount of xp
  
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id); //get user level
  
  
      dbres = await db.get(`${message.guild.id}.pingchannel`)
  
      if(dbres === null){
        message.channel.send(`${message.author.tag}, congratulations! You have leveled up to **${user.level}**. :tada:`);
      } else {
        client.channels.cache.get(dbres).send(`${message.author.tag}, congratulations! You have leveled up to **${user.level}**. :tada:`)
      }
  
       //send message when user levels up
      levelfunc.checkLevel(user.level, message, message.author.id); //nake sure user has the correct roles
      levelfunc.levelRole(user.level, message, message.author.id); //remove previous level role and give new one
    }

  }

});



client.login(config.token); //login

client.on("guildMemberAdd" ,(member) => {
  async function main() {
    var rolez = await db.get(`${member.user.id}.roles`)

    console.log(rolez)
  
    if(rolez != undefined){
      member.roles.add(rolez)
      .catch(e => {
        console.log(e)

        var userroles = msg.member._roles
        var roleidarr = []

        for (let i = 0; i < userroles.length; i++) {
          roleidarr.push(msg.guild.roles.cache.find(n => n.id === `${userroles[i]}`).name)
        }

        member.send('oops, i couldnt give you your roles back. Here is each role you had. Contact server owner')
        member.send(roleidarr)
        member.send(userroles)
        

      })
    }
  }
  main();
});

var times2 = {}

module.exports.times2 = times2;