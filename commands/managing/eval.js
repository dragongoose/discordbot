const { Client } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "eval",
    description: "owneronly",
    //aliases: ['repeat'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {
        if(msg.author.id != config.ownerid) return;
        const message = await msg.channel.send('Evaluating...')
        try{
            const data = eval(args.join(' ').replace(/```/g, ''))
            await message.edit(` eval: \`\`\`javascript\n ${data} \`\`\` `)
        } catch (e) {
            await message.edit(` e: \`\`\`javascript\n ${e} \`\`\` `)
        }



    },
};
