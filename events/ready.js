const client = require("../index");
const levelfunc = require("../utils/levelfunc");
const Levels = require("discord-xp");
const config = require("../config.json")

client.on("ready", () =>
    console.log(`${client.user.tag} is up and ready to go!`)
);

var times = {}

Levels.setURL(config.dburl); //Set mongodb url for discord-xp

client.on("messageCreate", async (msg) => {
    if (!msg.guild) return; //ignore if msg wasnt in a server
    if (msg.author.bot) return; //ignore if msg was from a bot

    //db.add(`${msg.author.id}.msgtotal`, 1)

    if (times[msg.author.id] === undefined) times[msg.author.id] = Date.now();

    if (Date.now() >= times[msg.author.id] + 30000) {

        //db.add(`${msg.author.id}.msgtwdlvl`, 1)

        times[msg.author.id] = Date.now();

        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Random number for xp
        const hasLeveledUp = await Levels.appendXp(msg.author.id, msg.guild.id, randomAmountOfXp); //give the random ammount of xp

        if (hasLeveledUp) {
            const user = await Levels.fetch(msg.author.id, msg.guild.id); //get user level


            dbres = await db.get(`${msg.guild.id}.pingchannel`)

            if (dbres === null) {
                msg.channel.send(`${msg.author.tag}, congratulations! You have leveled up to **${user.level}**. :tada:`);
            } else {
                client.channels.cache.get(dbres).send(`${msg.author.tag}, congratulations! You have leveled up to **${user.level}**. :tada:`)
            }

            //send msg when user levels up
            levelfunc.checkLevel(user.level, msg, msg.author.id); //nake sure user has the correct roles
            levelfunc.levelRole(user.level, msg, msg.author.id); //remove previous level role and give new one
        }
    }
})
