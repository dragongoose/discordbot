const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "ban",
    description: "bans a user",
    type: "CHAT_INPUT",
    options: [
        {
          name: "user",
          description: "Who do you want to ban?",
          type: "USER",
          required: true
        },
      ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        console.log(args)

        // if (!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp('No perms!')
        // let member = interaction.guild.members.cache.get(interaction.mentions.users.first().id)
        // if (!member) return interaction.followUp('Please specify a member for me to kick them')
        // let reason = args.slice(1).join(" ");
        // if (!reason) reason = 'No Reason Given';
        // if (!member.kickable) return interaction.followUp('This member is not kickable')
        
        
        
        // member.ban({ reason: reason})
        // .then(msg.channel.send(`banned ${member.user.tag}`))
        // .catch(err => console.log(err));

    },
};