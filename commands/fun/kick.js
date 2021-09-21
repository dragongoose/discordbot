const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");
const config = require("../../config.json");

module.exports = {
    name: "fakekick",
    description: "heheh trold",
    aliases: ['kick'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {
        try{
            const user = msg.author
            var member = msg.guild.members.resolve(user);
            if(!member.kickable) return msg.channel.send('user not kicable')
    
            let invite = await msg.channel.createInvite({
                maxAge: 604800, //1 day
                maxUses: 1
              }).catch(console.error);

            console.log(invite.code)
    
            member.send(`lmao baka discord.gg/${invite.code}`).then(() => {
                member.kick()
            })
            

            msg.channel.send(`lmao trolled ${msg.author.tag}`)

        } catch (e) {
            msg.channel.send('error')
            console.log(e)
        }

    },
};
