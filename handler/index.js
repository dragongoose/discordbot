const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const bot = require("../index.js");
const mongoose = require("mongoose");
const chalk = require("chalk")

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    var helpcommandcontent = {}

    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);

            if(!helpcommandcontent[directory]) helpcommandcontent[directory] = {}

            helpcommandcontent[directory][file.name] = file.description


            console.log(chalk.cyan('[!] Loaded command '), chalk.green(file.name), chalk.red(' from '), chalk.green(properties.directory))
        }
    });

    //create help command
    var helpcommand = {};
    helpcommand.name = 'help'
    helpcommand.description = "Shows the bot's every command."

    helpcommand.run = async (client, message, args) => {

        let helpString = "";

        //loop thorugh each element in helpcommandcontent
        for (var [key, value] of Object.entries(helpcommandcontent)) {
            helpString += `**${key}**\n`
            for (var [key2, value2] of Object.entries(value)) {
                helpString += `└ ${key2}: ${value2}\n`
            }
        }

        message.member.send({ content: helpString })
            .then(() => { message.react('✅'); })
            .catch((e) => {message.reply('I couldnt DM you!')})
        
    }
    client.commands.set('help', helpcommand);
    console.log(chalk.green('[!] Generated help command!'))

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);
        console.log(file)
        console.log(chalk.cyan('[!] Loaded slash command '), chalk.green(file.name))

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // Register for a single guild
        //await client.guilds.cache
            //.get("guild_id")
            //.commands.set(arrayOfSlashCommands);

        // Register for all the guilds the bot is in
        await client.application.commands.set(arrayOfSlashCommands);
    });

    // mongoose
    const { mongooseConnectionString } = require('../config.json')
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to mongodb'));


};