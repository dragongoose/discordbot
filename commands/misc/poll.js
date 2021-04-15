const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class PollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            group: 'misc',
            memberName: 'poll',
            description: 'Creates a poll with up to 10 choices.',
            examples: ["!poll \"What\'s your favourite food?\" \"Hot Dogs,Pizza,Burgers,Fruits,Veggies\" 10"],
            args: [{
                key: 'question',
                prompt: 'What is the poll question?',
                type: 'string',
            },
            {
                key: 'options',
                prompt: 'What options do you want for the poll?',
                type: 'string',
            }

            ]
        });
    }

    async run(msg, {
        question,
        options,
        time
    }) {

        var emojiList = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟'];
        var optionsList = options.split(",");
        if (optionsList.length >= 10) {
            return msg.channel.send('Cannot have more than 10 poll options!')
        }

        var optionsText = "";
        for (var i = 0; i < optionsList.length; i++) {
            optionsText += emojiList[i] + " " + optionsList[i] + "\n";
        }

        const pollembed = new Discord.MessageEmbed()
            .setTitle(':bar_chart: ' + question)
            .setDescription(optionsText)
            .setColor(0xD53C55) // Green: 0x00AE86
            .setTimestamp();

        msg.delete();

        msg.channel.send(pollembed)
            .then(async function (message) {
                var reactionArray = [];
                for (var i = 0; i < optionsList.length; i++) {
                    reactionArray[i] = await message.react(emojiList[i]);
                }
            });
    };
}
